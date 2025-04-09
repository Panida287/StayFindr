function App() {
    const title = document.querySelector("title");
    if (title) {
        title.textContent = "Homepage";
    }
    return (
        <>
            <button className="text-primary">Hello world</button>
        </>
    );
}

export default App;
