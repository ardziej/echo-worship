import app from "./app";

const PORT = 50760;

app.listen(PORT, () => {
    console.log('ECHO Stage timer - server listening on port: ' + PORT);
});