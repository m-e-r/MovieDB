import {View, Text, StyleSheet, FlatList, Image, TouchableOpacity} from "react-native";
import {useEffect, useState} from "react";
import { SearchBar } from '@rneui/themed';

export default function SearchScreen({ navigation }) {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");

    useEffect( () => {
        fetchPopularMovies()
    }, []);

    function fetchPopularMovies() {
        fetch(
            `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}`
        )
            .then((response) => response.json())
            .then((data) => setData(data.results));
        console.log(data.title);
    }

    function fetchMoviesFromSearch() {
        fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&language=en-US
            &query=${search}&page=1&include_adult=false`
        )
            .then((response) => response.json())
            .then((data) => setData(data.results));
        console.log(data);

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

    const updateSearch = (search) => {
        setSearch(search);
        fetchMoviesFromSearch();
    };

    return (
        <View style={styles.container}>
            <SearchBar
                style={styles.searchBar}
                onChangeText={updateSearch}
                placeholder="Search Movies..."
                value={search}
            />
            <FlatList
                data={data}
                extraData={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />

        </View>
    )
}

const Item = ({ navigation, title, movieId, img_path}) => (
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
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        flex: 100,
        backgroundColor: "#111",
    },
    searchBar: {
        fontSize: 20,
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

