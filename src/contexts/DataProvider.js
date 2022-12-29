import { useState, useEffect, createContext, useContext } from 'react'
import { getFirestore, getDocs, collection, collectionGroup, doc, getDoc, Timestamp, addDoc, orderBy, query, limit, setDoc } from '@firebase/firestore'
import { AuthContext } from './AuthProvider'

export const DataContext = createContext()

export const DataProvider = function(props) {
    const db = getFirestore()
    const [posts, setPosts] = useState([])
    const { user } = useContext(AuthContext)

    useEffect(() => {
        async function getPosts() {
            /* const response = await fetch('https://chief-flat-goose.glitch.me/api/posts')
            const data = await response.json()
            setPosts(data) */
            /* const querySnapshot = await getDocs(collection(db, 'posts')) */
            /* const q = query(collection(db, 'posts'), orderBy('date_created', 'desc'), limit(2)) */
            /* const q = query(collectionGroup(db, 'posts'), orderBy('date_created', 'desc')) */
            const q = query(collectionGroup(db, 'posts'))

            console.log(q)

            const querySnapshot = await getDocs(q)


            const postDocs = []
            
            querySnapshot.forEach(async (doc) => {

                const userData = await getDoc(doc.ref.parent.parent)
                const username = userData.data().username
                console.log(userData.id)

                postDocs.push({
                    id: doc.id,
                    uid: userData.id,
                    username: username,
                    ...doc.data()
                })

                setPosts(postDocs)
            })
        }

        getPosts()
    }, [])

    async function loadPost(uid, id) {
        /* const response = await fetch(`https://chief-flat-goose.glitch.me/api/post/${id}`)
        const data = await response.json()
        return data */
        const docRef = doc(db, 'users', uid, 'posts', id)
        const docSnap = await getDoc(docRef)

        const userData = await getDoc(docSnap.ref.parent.parent)
        const username = userData.data().username

        if (docSnap.exists()) {
            return {
                id: docSnap.id,
                uid: uid,
                username: username,
                ...docSnap.data()
            } 
        } else {
            console.log(`Post with id ${id} does not exist.`)
        }
    }

    async function addPost(title, body) {
        const newPost = {
            title: title,
            body: body,
            date_created: Timestamp.now()
        }

        const userDoc = await setDoc(doc(db, 'users', user.uid), {
            username: user.username
        })

        const postDoc = await addDoc(collection(db, 'users', user.uid, 'posts'), newPost)

        newPost.id = postDoc.id
        
        setPosts([newPost, ...posts])
    }
        
    async function fetchPokemon(parameter) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${parameter}`)
        const data = await response.json()
        return data
    }

    async function weatherFetch(cityname) {
        let APIkey = 'e58e31605e103eeaa1c736474c1a9e80'
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${APIkey}`)
        const weatherData = await response.json()
        return (
            weatherData
        )
    }

    const value = {
        posts,
        fetchPokemon,
        weatherFetch, 
        loadPost,
        addPost
    }

    return (
        <DataContext.Provider value={value}>
            { props.children }
        </DataContext.Provider>
    )
}