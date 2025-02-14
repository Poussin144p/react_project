export function Title( {setPage} ) {
    return(
        <h1 className="text-green-500 text-8xl" onClick={() => setPage('events') }>Evenements</h1>
    )
}