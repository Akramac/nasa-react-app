import { useEffect, useState } from "react"
import Main from "./components/Main.jsx"
import Footer from "./components/Footer.jsx"
import SideBar from "./components/SideBar.jsx"



function App() {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [showModal, setShowModal] = useState(false)
    function handleToggleModal(){
        setShowModal(!showModal)
    }

    useEffect(() => {
        async function fetchAPIData(){

            const NASA_KEY= 'EC1BQ5HiVKrV8Tjr2HleM7Lrb39k4zJb3YXbCaVe'
            const url = `https://api.nasa.gov/planetary/apod`+`?api_key=${NASA_KEY}`
            const today=(new Date).toDateString()
            const localKey=`NASA-${today}`
            if(localStorage.getItem(localKey)){
                const apiData=JSON.parse(localStorage.getItem(localKey))
                setData(apiData)
                console.log("Fetched from cache today"+apiData)
                return
            }
            localStorage.clear()

            try {
                const res=await fetch(url)
                const apiData=await res.json()
                localStorage.setItem(localKey,JSON.stringify(apiData))
                setData(apiData)
                console.log("Fetched from API today")
            }catch(err){
                console.log(err.message)
            }

        }
        fetchAPIData()
    }, []);
  return (
    <>
        {data ? (<Main data={data} />):(
            <div className="loadingState">
             <i className="fa-solid fa-gear" />
            </div>
            )
            }
        {showModal && (<SideBar data={data} handleToggleModal={handleToggleModal}/>)}
        { data && (<Footer data={data} handleToggleModal={handleToggleModal} />)

        }
    </>
  )
}

export default App
