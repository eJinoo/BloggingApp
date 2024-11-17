/* eslint-disable react/prop-types */
import { Button, Card, CardActions, CardContent, CardMedia, Chip, IconButton, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { db } from '../firebaseConfig';
import { doc, updateDoc, getDoc } from 'firebase/firestore';

const BlogCard = (props) => {
    const { blog, deleteBlog = () => {}, showDeleteIcon = true } = props;
    const [isFavorited, setIsFavorited] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFavoriteStatus = async () => {
            try {
                const blogRef = doc(db, 'blogs', blog.id);
                const blogSnapshot = await getDoc(blogRef);
                if (blogSnapshot.exists()) {
                    const blogData = blogSnapshot.data();
                    setIsFavorited(blogData.isFavorite || false);
                }
            } catch (error) {
                console.error("Error checking favorite status", error);
            }
        };

        fetchFavoriteStatus();
    }, [blog.id]);

    const toggleFavorite = async () => {
        try {
            const blogRef = doc(db, 'blogs', blog.id);
            await updateDoc(blogRef, {
                isFavorite: !isFavorited,
            });

            setIsFavorited(!isFavorited);
        } catch (error) {
            console.error("Error toggling favorite state", error);
        }
    };

    return (
        <Card style={{ position: 'relative' }}>
            <CardMedia
                sx={{ height: 140 }}
                image={blog.image}
                title="green iguana"
            />
            {
                showDeleteIcon && <IconButton style={{ position: 'absolute', right: '10px', top: '5px' }} aria-label="delete" size="small" onClick={() => deleteBlog(blog.id)}>
                <DeleteIcon fontSize="inherit" />
            </IconButton>
            }
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {blog.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {blog.description}
                </Typography>
                <Chip label={blog.category} variant="outlined" />

            </CardContent>
            <CardActions>
                <IconButton
                    color="error"
                    onClick={toggleFavorite}
                    // disabled={blog.userId === currentUserId}
                    >
                    {isFavorited ? (
                        <FavoriteIcon />
                    ) : (
                        <FavoriteBorderIcon />
                    )}
                </IconButton>
                <Button color='secondary' variant='contained' onClick={() => navigate(`/viewblogs/${blog.id}`)}>Learn More</Button>
            </CardActions>
        </Card>
    )
}

export default BlogCard