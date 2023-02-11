import { useEffect, useState } from "react";
import {View, Text, StyleSheet, FlatList, Image, Button, TouchableOpacity} from "react-native";

export default function HomeScreen({ navigation }) {
    const [data, setData] = useState([]);

    navigation.setOptions({
        headerRight: () => (
            <Button
                onPress={() => navigation.navigate('Search')}
                title="Search"
                color="#fff"
            />
        ),
    });

    useEffect(() => {
        fetchMovies();
    }, []);

    function fetchMovies() {
        fetch(
            `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.API_KEY}`
        )
            .then((response) => response.json())
            .then((data) => setData(data.results));
    }

    const renderItem = ({ item }) => (
        <Item
            navigation={navigation}
            movieId={item.id}
            title={item.title}
            img_path={item.poster_path}
            releaseDate={item.release_date}
        />
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
        </View>

    )
}

const Item = ({ navigation, title, movieId, img_path, releaseDate}) => (
    <TouchableOpacity onPress={() => navigation.navigate("Movie", {movieId})}>
        <View style={styles.item}>
            <Image
                style={styles.image}
                source={{
                    uri: `https://image.tmdb.org/t/p/original/${img_path}`,
                }}
            />
            <Text style={styles.title}>
                {title}
            </Text>
            <Text style={styles.desc}>
                {releaseDate}
            </Text>
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        flex: 10,
        backgroundColor: "#111",
        alignItems: "center",
    },
    item: {
        backgroundColor: "#111",
        padding: 10,
        marginVertical: 10,
        marginHorizontal: 20,
    },
    title: {
        fontSize: 26,
        alignSelf: "center",
        color: '#fff',
    },
    desc: {
        fontSize: 20,
        alignSelf: "center",
        color: '#fff',
    },
    image: {
        width:280,
        height:310,
        resizeMode:'contain',
        margin:4,
        alignSelf: "center",
    }
});
