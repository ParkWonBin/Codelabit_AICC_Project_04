import app from './src/app';

const PORT: number = parseInt(process.env.EXPRESS_PORT as string, 10) || 4000;

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});