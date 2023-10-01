import * as React from 'react';
import './ProductCard.css'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useCredentials } from '../../context';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, CardActionArea, Dialog, DialogActions } from '@mui/material';
import SkipNextRoundedIcon from '@mui/icons-material/SkipNextRounded';
import SkipPreviousRoundedIcon from '@mui/icons-material/SkipPreviousRounded';
import CloseIcon from '@mui/icons-material/Close';



export default function ProductCard({ info }) {
    const userData = useCredentials();

    const [favorite, setFavorite] = React.useState()
    const [color, setColor] = React.useState();
    const [photoDisplay, setPhotoDisplay] = React.useState(0);
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        if (userData.isConnected && userData.currentUser.favorites.length > 0) {
            if (userData.currentUser.favorites.some((e) => { return e === info.furnitureID })) {
                setFavorite(true);
                setColor(red[500]);
            } else {
                setFavorite(false);
                setColor("default");
            }
        }
    }, [info, userData])


    function handleFavorites() {
        if (!userData.isConnected) {
            return alert("Please log in to save to favorites!")
        }
        if (favorite) {
            setColor("default")
            const tempUser = userData.currentUser;
            const index = tempUser.favorites.indexOf(info.furnitureID);
            if (index !== -1) {
                tempUser.favorites.splice(index, 1);
                userData.setCurrentUser(tempUser)
            }
        }
        else {
            setColor(red[500])
            const tempUser = userData.currentUser;
            tempUser.favorites.push(info.furnitureID)
            userData.setCurrentUser(tempUser)
        }
        setFavorite(!favorite);
        userData.UpdateUser(userData.currentUser);
    }

    function nextImage() {
        if (info.photo[photoDisplay + 1]) {
            setPhotoDisplay(photoDisplay + 1)
        }
        else {
            setPhotoDisplay(0)
        }
    };

    function prevImage() {
        if (photoDisplay > 0) {
            setPhotoDisplay(photoDisplay - 1)
        }
        else {
            setPhotoDisplay(info.photo.length - 1)
        }
    };

    return (
        <Card elevation={24} sx={{ width: 330, height: 430, marginTop: "50px", transition: "0.3s", ':hover': { scale: "1.05" } }}>
            <CardHeader
                // avatar={
                //     <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                //         R
                //     </Avatar>
                // }
                action={
                    //     <IconButton aria-label="settings">
                    //         <MoreVertIcon />
                    //     </IconButton>
                    <IconButton onClick={handleFavorites} sx={{ my: "auto", color: { color } }} aria-label="add to favorites">
                        <FavoriteIcon fontSize='large' />
                    </IconButton>
                }
                title={info.category}
                // subheader="September 14, 2016"
                subheader={info.condition + ", " + info.color}
            />
            {/* <Link to={'/productPage'} state={info}> */}
            <CardActionArea onClick={handleClickOpen}>
                {/* () => { navigate("/productPage", { state: { info } }) } */}
                <CardMedia
                    component="img"
                    height="194"
                    image={info.photo[0] ? info.photo[photoDisplay] : 'https://scalebranding.com/wp-content/uploads/2022/02/home-furniture-logo_2.jpg'}
                    alt="Can't load image"
                />
            </CardActionArea>
            <Dialog onClose={handleClose} open={open} >
            <Box  sx={{position: 'fixed', backgroundColor: "white", borderBottomRightRadius:'20px'}}>
                    <IconButton aria-label="Next image" onClick={nextImage} >
                        <SkipPreviousRoundedIcon />
                    </IconButton>
                <IconButton aria-label="Close Dialog" onClick={handleClose} >
                    <CloseIcon />
                </IconButton>
                    <IconButton aria-label="Prev image" onClick={prevImage}>
                        <SkipNextRoundedIcon />
                    </IconButton>
                </Box>
            {/* sx={{ scale: "2" }} */}
                <CardMedia
                    component="img"
                    // height="194"
                    image={info.photo[0] ? info.photo[photoDisplay] : 'https://scalebranding.com/wp-content/uploads/2022/02/home-furniture-logo_2.jpg'}
                    alt="Can't load image"
                    sx={{width: "80vw"}}
                />
                
            </Dialog>
            <Box textAlign={'center'}>
                <IconButton aria-label="delete" onClick={nextImage}>
                    <SkipPreviousRoundedIcon />
                </IconButton>
                <IconButton aria-label="delete" onClick={prevImage}>
                    <SkipNextRoundedIcon />
                </IconButton>
            </Box>
            <CardActionArea onClick={() => { navigate("/productPage", { state: { info } }) }}>
                <CardContent style={{ height: 75, overflow: 'auto' }}>
                    <Typography variant="h6" color="text.primary" >
                        {info.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" >
                        {info.publishDate}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" >
                        {info.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            {/* <CardActions disableSpacing>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
            </CardActions> */}
        </Card >

    );
}
