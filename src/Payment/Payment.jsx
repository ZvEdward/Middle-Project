import * as React from 'react';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardContent from '@mui/joy/CardContent';
import Checkbox from '@mui/joy/Checkbox';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import {  FormControlLabel, IconButton, Radio, RadioGroup, Snackbar } from '@mui/material';
import { useCredentials } from '../context';
import { useNavigate } from 'react-router-dom';

export default function Payment() {
    const userData = useCredentials();
    const navigate = useNavigate();

    const [donationAmount, setDonationAmount] = React.useState("5$");

    const [cardNumber, setCardNumber] = React.useState();
    const [cardDate, setCardDate] = React.useState();
    const [cardCVV, setCardCVV] = React.useState();
    const [cardName, setCardName] = React.useState();
    const [saveCard, setSaveCard] = React.useState(Boolean);

    const [cardNumberError, setCardNumberError] = React.useState();
    const [cardDateError, setCardDateError] = React.useState();
    const [cardCVVError, setCardCVVError] = React.useState();
    const [cardNameError, setCardNameError] = React.useState();


    function handleSubmit() {
        if (cardNumber && validateCreditCardNumber(cardNumber)) {
            setCardNumberError(false)
            if (cardDate && validateExpirationDate(cardDate)) {
                setCardDateError(false)
                if (cardCVV && validateCVV(cardCVV)) {
                    setCardCVVError(false)
                    if (cardName && validateCardholderName(cardName)) {
                        setCardNameError(false)
                        if (saveCard) {
                            if (userData.isConnected) {
                                const tempUser = { ...userData.currentUser, cardInfo: { cardNumber, cardDate, cardCVV, cardName } }
                                userData.setCurrentUser(tempUser);
                                userData.UpdateUser(userData.currentUser);
                            } else {
                                return alert("Log in to save card")
                            }
                        }
                        alert("Thank you for your donation of " + donationAmount);
                        navigate("/");
                    } else {
                        setCardNameError(true)
                    }
                } else {
                    setCardCVVError(true)
                }
            } else {
                setCardDateError(true)
            }
        } else {
            setCardNumberError(true)
        }
    }

    function validateCreditCardNumber(cardNumber) {
        // Remove any non-digit characters from the card number
        const cleanedCardNumber = cardNumber.replace(/\D/g, '');

        // Check if the card number is empty or contains non-digit characters
        if (cleanedCardNumber.length === 0 || cleanedCardNumber.length !== cardNumber.length) {
            return false;
        }

        let sum = 0;
        let double = false;

        // Iterate over each digit in reverse order
        for (let i = cleanedCardNumber.length - 1; i >= 0; i--) {
            let digit = parseInt(cleanedCardNumber.charAt(i), 10);

            if (double) {
                digit *= 2;

                // If the doubled digit is greater than 9, subtract 9
                if (digit > 9) {
                    digit -= 9;
                }
            }

            sum += digit;
            double = !double;
        }

        // If the sum is divisible by 10, the card number is valid
        return sum % 10 === 0;
    }

    function validateExpirationDate(expirationDate) {
        // Split the expiration date into month and year
        const [month, year] = expirationDate.split('/');

        // Check if the month and year are valid numbers
        if (isNaN(month) || isNaN(year)) {
            return false;
        }

        // Check if the month is between 1 and 12
        if (month < 1 || month > 12) {
            return false;
        }

        // Get the current date
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1; // JavaScript months are 0-based

        // Convert the year to a four-digit format
        const fullYear = (year.length === 2) ? `20${year}` : year;

        // Check if the year is in the future
        if (fullYear < currentYear) {
            return false;
        }

        // If the year is the current year, check if the month is in the future
        if (fullYear == currentYear && month < currentMonth) {
            return false;
        }

        return true;
    }

    function validateCVV(cvv) {
        // Check if the CVV is a valid number
        if (isNaN(cvv)) {
            return false;
        }

        // Check if the CVV is a three or four-digit number
        if (cvv.length !== 3 && cvv.length !== 4) {
            return false;
        }

        return true;
    }

    function validateCardholderName(name) {
        // Check if the name is empty or contains invalid characters
        if (name.trim().length === 0 || /[^a-zA-Z\s-']/.test(name)) {
            return false;
        }

        return true;
    }

    return (
        <Card
            variant="outlined"
            sx={{
                maxHeight: 'max-content',
                maxWidth: '100%',
                mt: 15,
                mx: 'auto',
            }}
        >
            <Typography level="title-lg" startDecorator={<InfoOutlined />}>
                Add new card
            </Typography>
            <Divider inset="none" />
            <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">How much would you like to donate?</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    defaultValue={"5$"}
                    onChange={(event) => { setDonationAmount(event.target.value) }}
                >
                    <FormControlLabel value="5$" control={<Radio />} label="5$" />
                    <FormControlLabel value="10$" control={<Radio />} label="10$" />
                    <FormControlLabel value="25$" control={<Radio />} label="25$" />
                    <FormControlLabel value="50$" control={<Radio />} label="50$" />
                </RadioGroup>
            </FormControl>
            <Divider inset="none" />
            <CardContent
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, minmax(80px, 1fr))',
                    gap: 1.5,
                }}>
                <FormControl sx={{ gridColumn: '1/-1' }}>
                    <FormLabel>Card number</FormLabel>
                    <Input endDecorator={<CreditCardIcon />} error={cardNumberError} onChange={(event) => { setCardNumber(event.target.value) }}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Expiry date</FormLabel>
                    <Input endDecorator={<CreditCardIcon />} error={cardDateError} placeholder='MM/YY' onChange={(event) => { setCardDate(event.target.value) }}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>CVC/CVV</FormLabel>
                    <Input endDecorator={<InfoOutlined />} error={cardCVVError} onChange={(event) => { setCardCVV(event.target.value) }}
                    />
                </FormControl>
                <FormControl sx={{ gridColumn: '1/-1' }}>
                    <FormLabel>Card holder name</FormLabel>
                    <Input placeholder="Enter cardholder's full name" error={cardNameError} onChange={(event) => { setCardName(event.target.value) }}
                    />
                </FormControl>
                <Checkbox label="Save card" sx={{ gridColumn: '1/-1', my: 1 }} checked={saveCard} onChange={(event) => { setSaveCard(event.target.checked) }} />
                <CardActions sx={{ gridColumn: '1/-1' }}>
                    <Button variant="solid" color="primary" onClick={handleSubmit} >
                        Thank you!
                    </Button>
                </CardActions>
            </CardContent>
        </Card>
    );
}
