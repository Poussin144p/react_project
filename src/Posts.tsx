import {useEffect, useState} from "react";

export function Posts () {
    const [posts, setPosts] = useState([])


    useEffect(() => {
        fetch('http://localhost:3000/posts')
            .then(response => response.json())
            .then(data => setPosts(data))
            .catch(error => console.error('Error fetching posts:', error))
    }, [])

    return (
        <div>
            <h2>Posts</h2>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {posts.map(post => (
                    <li key={post.id}>{post.title}</li>
                ))}
            </ul>
        </div>
    )
}