import React,{useState,useEffect,ChangeEvent} from 'react';
import {Feather as Icon} from '@expo/vector-icons';
import {View,ImageBackground,Text,Image,StyleSheet} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';

interface IBGEUFResponse{
  sigla:string;
}

interface IBGECityResponse{
  nome:string;
}

const Home=()=>{
  const navigation=useNavigation();
  const [ufs,setUfs]=useState<string[]>([]);
  const [selectedUf,setSelectedUf]=useState('0');
  const [selectedCity,setSelectedCity]=useState('0');
  const [cities,setCities]=useState<string[]>([]);

  /*const dropUf=()=>{
    return (
        <RNPickerSelect
            onValueChange={(value) => setSelectedUf(value)}
            items={ufs.map(item=>item.sigla)}
        />
    );
  };*/

  useEffect(()=>{
    axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response=>{
        const ufInitials=response.data.map(uf=>uf.sigla);
        setUfs(ufInitials);
    });
  },[]);

  useEffect(()=>{
    axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`).then(response=>{
        const cityNames=response.data.map(city=>city.nome);
        setCities(cityNames);
    });
  },[selectedUf]);

  function handleSelectedUf(value:string){
    const uf=value;
    setSelectedUf(uf);
  }

  function handleSelectedCity(value:string){
    const city=value;
    setSelectedCity(city);
  }

  function handleNavigateToPoint(){
      console.log(selectedUf+':'+selectedCity)
      navigation.navigate('Points',{uf:selectedUf,city:selectedCity});
  };

    return(
        <ImageBackground source={require('../../assets/home-background.png')} style={styles.container} imageStyle={{width:274,height:368}}>
            <View style={styles.main}>
                <Image source={require('../../assets/logo.png')} />
                <View>
                  <Text style={styles.title}>Seu marketplace de coleta de resíduos.</Text>
                  <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</Text>
                </View>
                <View>
                  <RNPickerSelect
                    onValueChange={(value)=>handleSelectedUf(value)}
                    value={selectedUf}
                    items={ufs.map((uf)=>({key:uf,label:uf,value:uf}))}
                  />
                  <RNPickerSelect
                    onValueChange={(value)=>handleSelectedCity(value)}
                    value={selectedCity} 
                    items={cities.map((city)=>({key:city,label:city,value:city}))}
                  />
                </View>
            </View>
            <View style={styles.footer}>

                <RectButton style={styles.button} onPress={handleNavigateToPoint}>
                    <View style={styles.buttonIcon}>
                        <Text>
                            <Icon name="arrow-right" color="#fff" size={24} />
                        </Text>
                    </View>
                    <Text style={styles.buttonText}>Entrar</Text>
                </RectButton>
                
            </View>
        </ImageBackground>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 32,
      backgroundColor:'#f0f0f5',
    },
  
    main: {
      flex: 1,
      justifyContent: 'center',
    },
  
    title: {
      color: '#322153',
      fontSize: 32,
      fontFamily: 'Ubuntu_700Bold',
      maxWidth: 260,
      marginTop: 64,
    },
  
    description: {
      color: '#6C6C80',
      fontSize: 16,
      marginTop: 16,
      fontFamily: 'Roboto_400Regular',
      maxWidth: 260,
      lineHeight: 24,
    },
  
    footer: {},
  
    select: {},
  
    input: {
      height: 60,
      backgroundColor: '#FFF',
      borderRadius: 10,
      marginBottom: 8,
      paddingHorizontal: 24,
      fontSize: 16,
    },
  
    button: {
      backgroundColor: '#34CB79',
      height: 60,
      flexDirection: 'row',
      borderRadius: 10,
      overflow: 'hidden',
      alignItems: 'center',
      marginTop: 8,
    },
  
    buttonIcon: {
      height: 60,
      width: 60,
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      justifyContent: 'center',
      alignItems: 'center'
    },
  
    buttonText: {
      flex: 1,
      justifyContent: 'center',
      textAlign: 'center',
      color: '#FFF',
      fontFamily: 'Roboto_500Medium',
      fontSize: 16,
    }
  });