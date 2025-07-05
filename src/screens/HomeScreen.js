// // src/HomeScreen.js
// import React from 'react';
// import {View, Text, FlatList} from 'react-native';
// import {useGetPokemonQuery} from '../services/api';

// export default function HomeScreen() {
//   //   const {data, isLoading, error} = useGetPokemonQuery(0); // first page
//   const {data, isLoading, error} = useGetPokemonQuery(0);

//   if (isLoading) return <Text>Loading…</Text>;
//   if (error) return <Text>Error 😢</Text>;

//   return (
//     <FlatList
//       data={data.results}
//       keyExtractor={item => item.name}
//       renderItem={({item}) => (
//         <View style={{padding: 12}}>
//           <Text>{item.name}</Text>
//         </View>
//       )}
//     />
//   );
// }

import React, {useState, useEffect} from 'react';
import {Text, FlatList} from 'react-native';
import {useGetPokemonQuery} from '../services/api';
import PokeCard from '../components/PokeCard';

export default function HomeScreen() {
  const [page, setPage] = useState(0);
  const [allResults, setAllResults] = useState([]);
  const {data, isLoading, error, isFetching} = useGetPokemonQuery(page);

  // when 'data' changes, append new items
  useEffect(() => {
    if (data?.results) {
      setAllResults(prev => [...prev, ...data.results]);
    }
  }, [data]);

  if (isLoading) {return <Text>Loading…</Text>;}
  if (error) {return <Text>Error 😢</Text>;}

  /** FlatList tune */
  return (
    <FlatList
      data={allResults}
      keyExtractor={item => item.name}
      renderItem={({item}) => <PokeCard {...item} />}
      /** ↑ each card is its own memoised component – cheaper re-renders */

      initialNumToRender={10} // draw only first 10 rows
      windowSize={5} // keep 5 screens ahead/behind
      getItemLayout={(_, i) => ({
        // skip height measurement
        length: 80,
        offset: 80 * i,
        index: i,
      })}
      removeClippedSubviews // unmount off-screen (Android)
      onEndReached={() => setPage(p => p + 1)} // fetch next page
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        isFetching ? <Text style={{padding: 12}}>Loading…</Text> : null
      }
    />
  );
}
