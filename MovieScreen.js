import {useEffect, useState} from "react";
import {Image, StyleSheet, Text, View} from "react-native";

export default function MovieScreen({route}) {
    const [data, setData] = useState([]);
    const {movieId} = route.params;
    useEffect(() => {
        getMovie();
    }, []);

    function getMovie() {
        console.log(movieId);
        fetch(
            `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.API_KEY}&language=en-US`
        )
            .then((response) => response.json())
            .then((data) => setData(data));}
        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    {data.title}
                </Text>
                <Image
                    style={styles.image}
                    source={{uri: `https://image.tmdb.org/t/p/w500/${data.poster_path}`}}
                />
                <Text style={styles.desc}>
                    {data.overview}
                </Text>
            </View>
        )
}

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: "#000",
            padding: 10,
        },
        title: {
            fontSize: 32,
            alignSelf: "center",
            color: '#fff'
        },
        desc: {
            color: '#fff'
        },
        image: {
            width:280,
            height:310,
            resizeMode:'contain',
            margin:4,
            alignSelf: "center",
        }
    });