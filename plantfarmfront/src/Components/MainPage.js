import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import Footer from './Footer';
import PlantTile from './PlantTile';
import Divider from '@mui/material/Divider';

  const tiers = [
    {
      title: 'Pumpkin',
      type:"Vegetable",
      picture: {
        image: 'D:\Programming\PlantFarmFront\plantfarmfront\src\Images\pumpkin.png',
        width: '50',
      },
      humidity: "72",
      temperature: "20",
      timeOfGrowth: "20"
    },
    {
      title: 'Cucumber',
      type:"Vegetable",
      picture: {
        image: 'D:\Programming\PlantFarmFront\plantfarmfront\src\Images\pumpkin.png',
        width: '50',
      },
      humidity: "75",
      temperature: "23",
      timeOfGrowth: "20"
    },
    {
      title: 'Peper',
      type:"Vegetable",
      picture: {
        image: 'D:\Programming\PlantFarmFront\plantfarmfront\src\Images\pumpkin.png',
        width: '50',
      },
      humidity: "80",
      temperature: "30",
      timeOfGrowth: "20"
    },
  ];


  
class MainPage extends React.Component{
    render(){
        return(
            <React.Fragment>
            <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
            <CssBaseline />
            <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 4, pb: 6 }}>
              <Typography  component="h1" variant="h3" align="center" color="text.primary" gutterBottom>
                Plants
              </Typography>
              <Typography variant="h6" align="center" color="text.secondary" component="p">
                Create you own plant collection. Set the breeding requirements of your plants and adjust them to your garden on an ongoing basis.
              </Typography>
            </Container>
            <PlantTile tiers={tiers}/>
            <Divider sx={{ pt: 1, pb: 6 }} />
            <Divider color="success" sx={{ pt: 1, pb: 6 , backgroundColor: "#edeec9"}} />
            <Footer></Footer>
          </React.Fragment>
        )
        
    }
}
export default MainPage;