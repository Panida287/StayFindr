function App() {
    const title = document.querySelector("title");
    if (title) {
        title.textContent = "Homepage";
    }
    return (
        <>
            <button className="text-primary">Homepage</button>
        </>
    );
}

export default App;
