import React, 
       {useState, 
        useEffect}
       from 'react';
import { useHistory, withRouter } from "react-router-dom";
import {makeStyles}  from '@material-ui/core/styles';
import {Grid, 
        Button,
        RadioGroup,
        TextField,
        FormControl,
        FormLabel,
        FormControlLabel,
        Typography,
        Radio} 
        from '@mui/material';

import PlantService from '../../Services/PlantService'
import { BoxUpload } from '../../style';
import { ImagePreview} from '../../style';
import FolderIcon from "../../Images/picture.png";
import CloseIcon from "../../Images/CloseIcon.svg";

const useStyle = makeStyles(theme => ({
    root: {
    '& .MuiFormControl-root':{
        width :'90%',
        margin : theme.spacing(1),
       }
    },
}));

const buttonStyle = makeStyles(theme => ({
    root: {
        position:'absolute',
        right:'10px',
        display:"flex",
        bottom: '3px',
        margin : theme.spacing(),
       }
}));

const typeOfPlant = [
    { id: 'Vegetable', title: 'Vegetable'},
    { id: 'Herb', title: 'Herb' },
    { id: 'Flower', title: 'Flower' },
    { id: 'Other', title: 'Other' },
]

const initial = {
    id: 0,
    name: '',
    photo:'',
    humidity: '',
    temperature: '',
    amountOfDays: '',
    type: 'Vegetable',
}
 const PlantForm = (props) =>  {

    const { id } = props.match.params;
    const [ values, setValues] = useState(initial);
    const [ errors, setErrors] = useState({});
    const [ alert, setAlert] = useState('')

    const [ file, setFile] = useState();
    const [ image, setImage] = useState('')
    const [ isUploaded, setIsUploaded] = useState(false)
    const [ isEdited, setIsEdited] =useState(false)
    const [ isAdd, setIsAdd] = useState(true)

    const path = 'http://localhost:8080/api/plants/';
    const classes  = useStyle();
    const button  = buttonStyle();

    let history = useHistory();

    useEffect(() => {
        if (id!= null){
        PlantService.getPlantById(id).then((res) => {
            setValues(res.data);
            setIsUploaded(true);
            setIsAdd(false)
        })}
    }, []);
   
    const handleSubmit = x => {
        x.preventDefault()
        if (validate()) {
        const formData = new FormData();
        formData.append("file",file);
        formData.append('plant', new Blob([JSON.stringify({
            "name": values.name,
            "type": values.type,
            "humidity": values.humidity,
            "temperature": values.temperature,
            "amountOfDays": values.amountOfDays 
        })], {
            type: "application/json"
        }));
  
        PlantService.addPlant(formData).then(res => { 
                history.push('/plants');
                 window.location.reload();
         })
        }
    }

    const handleEdit = x => {
        x.preventDefault()
        if (validate() ) {
        const formData = new FormData();
        formData.append('plant', new Blob([JSON.stringify({
            "id": id,
            "name": values.name,
            "type": values.type,
            "photo": values.photo,
            "humidity": values.humidity,
            "temperature": values.temperature,
            "amountOfDays": values.amountOfDays 
        })], {
        type: "application/json"
        }));

        if (!isEdited){
        PlantService.updatePlant(formData).then(res => { 
            history.push('/plants');
             window.location.reload();
        })}
        else {
        formData.append("file",file);
        PlantService.updatePlantAndImage(formData).then(res => { 
            history.push('/plants');
            window.location.reload();
        })
        }}
    }

    const validate=() => {
        let formErrors ={}
        formErrors.name = values.name ? "" : "This field is required."
        formErrors.humidity = (/^[0-9]{2}$|^[0-9]{1}$/).test(values.humidity) ? "" : "Maxiumum 2 numbers required"
        formErrors.temperature = (/^[0-9]{2}$|^[0-9]{1}$/).test(values.temperature) ? "" : "Maxiumum 2 numbers required"
        formErrors.amountOfDays = (/^[0-9]{2}$|^[0-9]{1}$|^[0-9]{3}$/).test(values.amountOfDays) ? "" : "Maxiumum 3 numbers required"
        setErrors({
            ...formErrors
        })
        if (!isUploaded) setAlert("Image is required")
        else setAlert("")
        return Object.values(formErrors).every(x => x == "")
    }
    
    const handleInputChange = x => {
        const {name, value} = x.target
        setValues({
            ...values,
            [name]:value
        })  
    }

    function handleImageChange(e) {
        if (e.target.files && e.target.files[0]){
            let reader = new FileReader()
            reader.onload = function(e){
                setImage(e.target.result)
                setIsUploaded(true)
            }
            reader.readAsDataURL(e.target.files[0])
            setFile(e.target.files[0])
        }
    }

    return (
        <form className = {classes.root} 
            autoComplete="off">
        <Grid container >
            <Grid item xs={6}>
                <TextField
                    variant="filled" 
                    label = "Name"
                    name = "name"
                    value = {values.name}
                    onChange = {handleInputChange}
                    {...(errors.name && {error:true, helperText:errors.name})}
                />
                <TextField
                    variant="filled" 
                    label = "Humidity [%]"
                    name = "humidity"
                    value = {values.humidity}
                    onChange = {handleInputChange}
                    {...(errors.humidity && {error:true, helperText:errors.humidity})}
                />
                <TextField
                    variant="filled" 
                    label = "Temperature [°C]"
                    name = "temperature"
                    value = {values.temperature}
                    onChange = {handleInputChange}
                    {...(errors.temperature && {error:true, helperText:errors.temperature})}
                />
                <TextField
                    variant="filled" 
                    label = "Time of growth [days]"
                    name = "amountOfDays"
                    value = {values.amountOfDays}
                    onChange = {handleInputChange}
                    {...(errors.amountOfDays && {error:true, helperText:errors.amountOfDays})}
                />
                </Grid>
                <Grid item xs={6} 
                    sx={{ pt: 1 }} 
                    style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                <Grid container>
                <Grid item xs={12}>
                <BoxUpload>
                <div className="image-upload">
                    {!isUploaded ? 
                    (<>
                        <label htmlFor="upload-input">
                        <img src={FolderIcon} 
                            class="center" 
                            alt="placeholder" 
                            style ={{ width:100, height:100}}/>
                        <p style={{color:'#444'}}>Upload image</p>
                        </label>
                        <input id="upload-input" 
                            type="file" 
                            accept=".jpg,.jpeg,.gif,.png,.mov,.mp4"
                            onChange={handleImageChange}/>
                    </>
                    ) : (
                        <ImagePreview>
                        <img className="close-icon" 
                            src={CloseIcon} 
                            alt="CloseIcon"
                            onClick={() => { 
                                setIsUploaded(false)
                                setImage(null)
                                setFile(null)
                                setIsEdited(true)
                                }}/>
                        { (!isEdited  && !isAdd) ? 
                            <img id="uploaded-image"
                            src = {path.concat(id,"/download")}  
                            draggable={false}
                            alt="uploaded-img" />  
                        : 
                            <img id="uploaded-image"
                            src={image}
                            draggable={false}
                            alt="uploaded-img" />
                            }
                        </ImagePreview>
                        ) 
                    }
                </div>
                </BoxUpload>
                <Typography style={{display:'flex', justifyContent:'center', alignItems:'center', color:'#d00000'}} 
                sx={{ pt: 1, pb:0 }}>{alert}
                </Typography>    
                </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} sx={{ pb:4 }}>
                <FormControl >
                <FormLabel>Type</FormLabel>
                <RadioGroup row
                    name = "type"
                    value = {values.type}
                    onChange = {handleInputChange}>
                {typeOfPlant.map( (type, index) => (
                    <FormControlLabel value ={type.id} 
                        control = {<Radio/>} 
                        label ={type.title}/>
                    ))}
                    </RadioGroup>
                    </FormControl>  
                </Grid>
                <Grid classes={{root:button.root}} 
                    item xs={12}> 
                {id ==null ? 
                (  <Button onClick={handleSubmit} 
                        variant ="contained"  
                        size ="medium" 
                        color ='inherit' 
                        sx={{ backgroundColor: "#adc178", mr: 1 }}> Submit</Button>
                ) : (  
                    <Button onClick={handleEdit} 
                        variant ="contained"  
                        size ="medium" 
                        color ='inherit' 
                        sx={{ backgroundColor: "#adc178", mr: 1 }}> Edit</Button>)
                }
            </Grid>
        </Grid>
        </form>
    )
}

export default withRouter(PlantForm);