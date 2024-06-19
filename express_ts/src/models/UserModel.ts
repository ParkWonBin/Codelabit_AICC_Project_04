import oracledb from 'oracledb';
import dbConfig from '../config/dbConfig';
import { User } from '../types/User';

class UserModel {
  static async create(user: User): Promise<User> {
    const connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      `INSERT INTO users (username, password, email) VALUES (:username, :password, :email) RETURNING id INTO :id`,
      {
        username: user.username,
        password: user.password,
        email: user.email,
        id: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
      },
    ) as any;
    
    if (result.outBinds && result.outBinds.id) {
      user.id = result.outBinds.id[0];
    }
    
    await connection.close();
    return user;
  }

  static async findByUsername(username: string): Promise<User | null> {
    const connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      `SELECT id, username, password, email FROM users WHERE username = :username`,
      [username],
    ) as any;
    
    await connection.close();
    return result.rows && result.rows.length ? result.rows[0] : null;
  }

  static async delete(userId: number): Promise<void> {
    const connection = await oracledb.getConnection(dbConfig);
    await connection.execute(`DELETE FROM users WHERE id = :id`, [userId]);
    await connection.close();
  }

  static async update(userId: number, updateData: Partial<User>): Promise<User | null> {
    const connection = await oracledb.getConnection(dbConfig);
    const updateFields = Object.keys(updateData)
      .map((key) => `${key} = :${key}`)
      .join(', ');
    const result = await connection.execute(
      `UPDATE users SET ${updateFields} WHERE id = :id`,
      { ...updateData, id: userId },
    ) as any;
    
    await connection.close();
    return result.rowsAffected ? UserModel.findById(userId) : null;
  }

  static async findById(userId: number): Promise<User | null> {
    const connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      `SELECT id, username, password, email FROM users WHERE id = :id`,
      [userId],
    ) as any;
    
    await connection.close();
    return result.rows && result.rows.length ? result.rows[0] : null;
  }
}

export default UserModel;
