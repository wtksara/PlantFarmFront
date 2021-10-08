import  {useState} from 'react';
import  {useEffect} from 'react';
import {makeStyles}  from '@material-ui/core/styles';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import RadioGroup from '@mui/material/RadioGroup';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import Select from '@mui/material/Select';
import Image from 'material-ui-image';

const useStyle = makeStyles(theme => ({
    root: {
    '& .MuiFormControl-root':{
        width :'80%',
        margin : theme.spacing(1)
       }
    },
}));

const typeOfPlant = [
    { id: 'fruit', title: 'Fruit' },
    { id: 'vegetable', title: 'Vegetable' },
    { id: 'herbs', title: 'Herb' },
    { id: 'flower', title: 'Flower' },
    { id: 'other', title: 'Other' },
]

const initial = {
    id: 0,
    name: '',
    humidity: '',
    temperature: '',
    timeOfGrowth: '',
    type: 'other',
}

export default function PlantForm() {
    const [ values, setValues] = useState(initial);
    const classes  = useStyle();

    const handleInputChange = e => {
        const {name, value} = e.target
        setValues({
            ...values,
            [name]:value
        })
    }
    
    return (
            <form className = {classes.root} autoComplete="off" >
            <Grid container>
                <Grid item xs={6}>
                    <TextField
                        variant = "outlined"
                        label = "Name"
                        name = "name"
                        value = {values.name}
                        onChange = {handleInputChange}
                    />
                    <TextField
                        variant = "outlined"
                        label = "Humidity [%]"
                        name = "humidity"
                        value = {values.humidity}
                        onChange = {handleInputChange}
                    />
                     <TextField
                        variant = "outlined"
                        label = "Temperature [°C]"
                        name = "temperature"
                        value = {values.temperature}
                        onChange = {handleInputChange}
                    />
                     <TextField
                        variant = "outlined"
                        label = "Time of growth [days]"
                        name = "timeOfGrowth"
                        value = {values.timeOfGrowth}
                        onChange = {handleInputChange}
                    />
                    
                </Grid>
                <Grid item xs={6}>
                    <Image src='../Images/cucumber.png'  fullWidth color="red"/>
                    <FormControl >
                        <FormLabel>Type</FormLabel>
                        <RadioGroup row
                            name = "type"
                            value = {values.type}
                            onChange = {handleInputChange}>
                        { typeOfPlant.map( (type, index) => (
                                <FormControlLabel value ={type.id} control = {<Radio/>} label ={type.title}/>
                        ))}
                        </RadioGroup>
                    </FormControl>
                
                    <div>
                        <Button
                
                          />
                        <Button
                       
                         />
                    </div>
                </Grid>
                
            </Grid>
            </form>
    
    )
}