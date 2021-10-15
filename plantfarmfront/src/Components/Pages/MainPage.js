import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';

import Footer from '../Footer';
import PlantTile from '../Tiles/PlantTile';
import Topic from '../Topic'
import Table from '../Table';
import PlantService from '../../Services/PlantService'
import PatchTile from '../Tiles/PatchTile';
import WaterTank from '../WaterTank';

class MainPage extends React.Component{

    constructor(props){
        super(props)

    this.state = {
        plants: [] 
    }
    } 

   
    
    componentDidMount(){
      PlantService.getPlants().then((response) => {
      this.setState({plants: response.data});
      });
    }

    render(){
        const patchs = [
            {
              key:'1',
              isEmpty:false,
              title: 'Pumpkin',
              type:"Vegetable",
              picture: {
                image: 'D:\Programming\PlantFarmFront\plantfarmfront\src\Images\pumpkin.png',
                width: '50',
              },
              humidity: "72",
              temperature: "20",
              timeOfGrowth: "20",
              actualDay: "5",
            },
            {
              key:'2',
              isEmpty:false,
              title: 'Cucumber',
              type:"Vegetable",
              picture: {
                image: 'D:\Programming\PlantFarmFront\plantfarmfront\src\Images\pumpkin.png',
                width: '50',
              },
              humidity: "75",
              temperature: "23",
              timeOfGrowth: "20",
              actualDay: "8",
            },
            {
              key:'3',
              isEmpty:false,
              title: 'Cucumber',
              type:"Vegetable",
              picture: {
                image: 'D:\Programming\PlantFarmFront\plantfarmfront\src\Images\pumpkin.png',
                width: '50',
              },
              humidity: "80",
              temperature: "30",
              timeOfGrowth: "40",
              actualDay: "15",
            },  
            {
              key:'4',
              isEmpty:true,
              title: '',
              type:"",
              picture: {
                image: '',
                width: '',
              },
              humidity: "",
              temperature: "",
              timeOfGrowth: "",
              actualDay: "",
            },
            {
              key:'5',
              isEmpty:false,
              title: 'Cucumber',
              type:"Vegetable",
              picture: {
                image: 'D:\Programming\PlantFarmFront\plantfarmfront\src\Images\pumpkin.png',
                width: '50',
              },
              humidity: "80",
              temperature: "30",
              timeOfGrowth: "40",
              actualDay: "15",
            },  
          ];
        return(
            <React.Fragment>
            <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
            <CssBaseline />
            <Topic title ="Plants" text="Create you own plant collection. Set the breeding requirements of your plants and adjust them to your garden on an ongoing basis." />
            <PlantTile plants={this.state.plants} visibility ={false}/>
            <Divider sx={{ pt: 1, pb: 6 , backgroundColor: "#ffffff"}} />
            <Container maxWidth sx ={{ pt: 2, pb: 4 ,alignItems: 'flex-end' , backgroundColor: "#fefae0"}} >
            <Topic title ="History" text=" Check the history of measurements made during plant growth and, based on them, choose the best growing conditions for the plants to ensure the best quality." />
            <Table/>
            </Container>
            <Container maxWidth sx ={{ pt: 2, pb: 2 ,alignItems: 'flex-end' , backgroundColor: "#ffffff"}} >
            <Topic title ="Managment" text="Manage your plant crops from the control panel.You can monitor the condition of your plants on an ongoing basis and water them remotely." />
            <PatchTile patchs={patchs} visibility={false}/>
            </Container>
            <Container maxWidth sx ={{ pb: 4 ,alignItems: 'flex-end' , backgroundColor: "#fefae0"}} >
            <WaterTank visibility ={false}/>
            </Container>
            <Footer/>
            </React.Fragment>
        )
        
    }
}
export default MainPage;