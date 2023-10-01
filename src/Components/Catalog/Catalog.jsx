import * as React from 'react';
import { Box, Grid } from "@mui/material"
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ListIcon from '@mui/icons-material/List';
import { useFurniture } from "../../furnitureContext"
import ProductCard from '../ProductCard/ProductCard'

function Catalog() {
    const furnitureData = useFurniture()
    const furniture = furnitureData.furniture

    const [open, setOpen] = React.useState(false);
    const [category, setCategory] = React.useState('');
    const [color, setColor] = React.useState('');
    const [condition, setCondition] = React.useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason !== 'backdropClick') {
            setOpen(false);
        }
    };

    const [displayed, setDisplayed] = React.useState(furniture.filter((e) => {return Boolean(!e.ordered)}));

    function fillter(){
        let filteredFurniture = furniture;
        filteredFurniture = filteredFurniture.filter((e) => {return Boolean(!e.ordered)});
        if(category && category != "None"){
            // console.log("entered category");
            filteredFurniture = filteredFurniture.filter((e) => {return e.category == category});
        }
        if (color && color != "None") {
            // console.log("entered color");
            filteredFurniture = filteredFurniture.filter((e) => {return e.color == color})
        }
        if (condition && condition != "None") {
            // console.log("entered condition");
            filteredFurniture = filteredFurniture.filter((e) => {return e.condition == condition})
        }
        setDisplayed(filteredFurniture);
        handleClose();
    }

    return (
        <>

            <Box sx={{ m: "100px", flexGrow: 1 }}>
                <div>
                    <Button onClick={handleClickOpen} variant="contained" endIcon={<ListIcon />} fullWidth sx={{
                        ':hover': {
                            bgcolor: "#37F715",
                            color: 'white',
                        }, bgcolor: "#00802D",
                        mb: "30px",
                    }}>Filter</Button>
                    <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
                        <DialogTitle>What are you looking for?</DialogTitle>
                        <DialogContent>
                            <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>

                                <FormControl sx={{ m: 1, minWidth: 120 }}>
                                    <InputLabel id="demo-dialog-select-label">Category</InputLabel>
                                    <Select
                                        value={category}
                                        onChange={(event) => {
                                            (
                                                setCategory(event.target.value) || '')
                                        }}
                                        input={<OutlinedInput label="Category" />}
                                    >
                                        <MenuItem value={"None"}>
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={"Sofas"}>Sofas</MenuItem>
                                        <MenuItem value={"Beds"}>Beds</MenuItem>
                                        <MenuItem value={"Tables"}>Tables/Chairs</MenuItem>
                                        <MenuItem value={"Storage"}>Storage</MenuItem>
                                        <MenuItem value={"Electronics"}>Electronics</MenuItem>
                                    </Select>
                                </FormControl>

                                <FormControl sx={{ m: 1, minWidth: 120 }}>
                                    <InputLabel id="demo-dialog-select-label">Color</InputLabel>
                                    <Select
                                        value={color}
                                        onChange={(event) => {
                                            (
                                                setColor(event.target.value) || '')
                                        }}
                                        input={<OutlinedInput label="Color" />}
                                    >
                                        <MenuItem value={"None"}>
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={"Red"}>Red</MenuItem>
                                        <MenuItem value={"Orange"}>Orange</MenuItem>
                                        <MenuItem value={"Yellow"}>Yellow</MenuItem>
                                        <MenuItem value={"Green"}>Green</MenuItem>
                                        <MenuItem value={"Blue"}>Blue</MenuItem>
                                        <MenuItem value={"Purple"}>Purple</MenuItem>
                                        <MenuItem value={"Pink"}>Pink</MenuItem>
                                        <MenuItem value={"Black"}>Black</MenuItem>
                                        <MenuItem value={"White"}>White</MenuItem>
                                        <MenuItem value={"Grey"}>Grey</MenuItem>
                                        <MenuItem value={"Brown"}>Brown</MenuItem>
                                        <MenuItem value={"MultiColor"}>MultiColor</MenuItem>
                                    </Select>
                                </FormControl>


                                <FormControl sx={{ m: 1, minWidth: 120 }}>
                                    <InputLabel id="demo-dialog-select-label">Condition</InputLabel>
                                    <Select
                                        value={condition}
                                        onChange={(event) => {
                                            (
                                                setCondition(event.target.value) || '')
                                        }}
                                        input={<OutlinedInput label="Condition" />}
                                    >
                                        <MenuItem value={"None"}>
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={"Like New"}>Like New</MenuItem>
                                        <MenuItem value={"Excellent"}>Excellent</MenuItem>
                                        <MenuItem value={"Gently Used"}>Gently Used</MenuItem>
                                        <MenuItem value={"Used"}>Used</MenuItem>
                                        <MenuItem value={"Salvage"}>Salvage</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button onClick={fillter}>Ok</Button>
                        </DialogActions>
                    </Dialog>
                </div>
                <Grid container sx={{width: "fullWidth"}} display="flex" justifyContent="space-around" alignItems="center" spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {displayed.map((value, i) => <ProductCard key={i} info={value} />)}
                </Grid>
            </Box>
        </>
    )
}
export default Catalog