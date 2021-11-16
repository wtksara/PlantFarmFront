import  React, {useCallback, useState} from 'react';
import {makeStyles}  from '@material-ui/core/styles';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import RadioGroup from '@mui/material/RadioGroup';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import Image from 'material-ui-image';
import { useHistory } from "react-router-dom";
import PlantService from '../../Services/PlantService'
import { useEffect, useRef } from 'react';
import {withRouter} from 'react-router-dom';
import {useDropzone} from 'react-dropzone'
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import { BoxUpload } from '../../style';
import { ImagePreview} from '../../style';
import FolderIcon from "../../Images/picture.png";
import CloseIcon from "../../Images/CloseIcon.svg";
import { typography } from '@mui/system';
import { useLocation } from "react-router-dom";
import DialogPage from '../Dialogs/NoneDialog';

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
    }
    
));

const typeOfPlant = [
    { id: 'Vegetable', title: 'Vegetable' },
    { id: 'Herbs', title: 'Herb' },
    { id: 'Flower', title: 'Flower' },
    { id: 'Other', title: 'Other' },
]

const initial = {
    id: 0,
    name: '',
    humidity: '',
    temperature: '',
    amountOfDays: '',
    type: 'other',
}
 const PlantForm = (props) =>  {

    const { id } = props.match.params;
    const [ values, setValues] = useState(initial);
    const [ errors, setErrors] = useState({});
    const [ file, setFile] = useState();
    const [ image, setImage] = useState('')
    const [ isUploaded, setIsUploaded] = useState(false)
    const [ alert, setAlert] = useState('')


    let history = useHistory();

    const classes  = useStyle();
    const button  = buttonStyle();

    useEffect(() => {
        if(id!= null){
        PlantService.getPlantById(id).then((res) => {
            setValues(res.data);
        }
        )}
 }, []);
   

    const handleInputChange = x => {
        const {name, value} = x.target
        setValues({
            ...values,
            [name]:value
        })
        
    }
  
    const handleSubmit = x => {
        
        x.preventDefault()
        if (validate()) {
        // Update photo
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
        let plant= {name: values.name, type: values.type, photo : "", humidity: values.humidity, temperature: values.temperature, amountOfDays: values.amountOfDays };
        PlantService.updatePlant(plant, id).then(res => {
            history.push('/plants');
            window.location.reload();
        }
        )
        }
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
    
    function Dropzone() {
      const onDrop = useCallback(acceptedFiles => {
        setFile(acceptedFiles[0]);
      }, [])
      const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
    
      return (
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          {
            isDragActive ?
              <p>Drop the files here ...</p> :
              <IconButton aria-label="Drag files here">
              <AddPhotoAlternateIcon fontSize="large" />
              </IconButton>
          }
        </div>
      )
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
            <form className = {classes.root} autoComplete="off">
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
                <Grid  item xs={6} sx={{ pt: 1 }} style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                <Grid container>
               <Grid item xs={12}>
                <BoxUpload>
                <div className="image-upload">
                    {
                        !isUploaded ? (
                            <>
                            <label htmlFor="upload-input">
                            <img src={FolderIcon} class="center" alt="placeholder" style ={{ width:100, height:100}}/>
                            <p style={{color:'#444'}}>Upload image</p>
                            </label>
                            <input id="upload-input" type="file" accept=".jpg,.jpeg,.gif,.png,.mov,.mp4"
                              onChange={handleImageChange}
                              
                              ></input>
                            </>
                        ) : (
                            <ImagePreview>
                            <img 
                            className="close-icon" 
                            src={CloseIcon} 
                            alt="CloseIcon"
                            onClick={() => { 
                                setIsUploaded(false)
                                setImage(null)
                                setFile(null)}}/>
                            <img
                                id="uploaded-image"
                                src={image}
                                draggable={false}
                                alt="uploaded-img"
                                />
                            </ImagePreview>
                        ) 
                    }
                </div>
              </BoxUpload>
              <Typography style={{display:'flex', justifyContent:'center', alignItems:'center', color:'#d00000'}} sx={{ pt: 1, pb:0 }} >{alert}</Typography>    
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
                    { typeOfPlant.map( (type, index) => (
                        <FormControlLabel value ={type.id} control = {<Radio/>} label ={type.title}/>
                    ))}
                    </RadioGroup>
                    </FormControl>  
                    
                </Grid>
                <Grid classes={{root:button.root}} item xs={12}> 
                {id ==null ? 
                (  <Button onClick={handleSubmit} variant ="contained"  size ="medium" color ='inherit' sx={{ backgroundColor: "#adc178", mr: 1 }}> Submit</Button>)
                    :
                (  <Button onClick={handleEdit} variant ="contained"  size ="medium" color ='inherit' sx={{ backgroundColor: "#adc178", mr: 1 }}> Edit</Button>)
                }
                </Grid>
              </Grid>
              <div>Icons made by 
                  <Link style={{ color: '#000000' }} to="https://www.freepik.com" title="Freepik"> Freepik </Link> 
                  from <Link style={{ color: '#000000' }} to="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</Link> </div>
            </form>
    
    )
}

export default withRouter(PlantForm);