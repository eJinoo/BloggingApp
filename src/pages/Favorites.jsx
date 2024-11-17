import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig'; // Firebase config
import { collection, query, where, getDocs } from 'firebase/firestore';
import BlogCard from '../components/BlogCard'

const Favorites = ({ currentUserId }) => {
    const [favoritedBlogs, setFavoritedBlogs] = useState([]);

    useEffect(() => {
        const fetchFavoritedBlogs = async () => {
            try {
                const q = query(
                    collection(db, 'blogs'),
                    where('isFavorite', '==', true)
                );
                const querySnapshot = await getDocs(q);
                const favoritedBlogs = [];
                querySnapshot.forEach((doc) => {
                    favoritedBlogs.push({ id: doc.id, ...doc.data() });
                });
                setFavoritedBlogs(favoritedBlogs);
            } catch (error) {
                console.error("Error fetching favorited blogs", error);
            }
        };

        fetchFavoritedBlogs();
    }, []);

    return (
        <div>
            <h1>Favorites</h1>
            <div>
                {favoritedBlogs.map((blog) => (
                    <BlogCard
                        key={blog.id}
                        blog={blog}
                        currentUserId={currentUserId}
                        showDeleteIcon={false}
                    />
                ))}
            </div>
        </div>
    );
};

export default Favorites;

