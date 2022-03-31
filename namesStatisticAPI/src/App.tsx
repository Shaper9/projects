import React, { useState, useRef } from 'react';
import axios from 'axios';
import './App.css';
import ClipLoader from "react-spinners/ClipLoader";


function App() {

  interface nameData {
    data: {
      country: { country_id: string, probability: number }[]
    },
    name: string
  }

  const [chartUrl, setChartUrl] = useState<string>('no data')
  const [loading, setLoading] = useState<boolean | null>(null)
  const [error, setError] = useState<boolean>(false)
  const [showImg, setShowImg] = useState<boolean>(false)
  const [searchedname, setSearchedname] = useState<string>("no data")
  const [showText, setShowText] = useState<boolean>(false)

  const fetchData = async (name: string) => {
    try {
      setLoading(true)
      setImgLoading(true)
      setChartUrl("")
      setShowImg(true)
      setShowText(false)
      if (nameInputRef.current!.value.length < 2) {
        setLoading(false)
        return alert("cannot find your name in database")
      }
      const nameResponse = await axios.get(`https://api.nationalize.io/?name=${name}`)
      if (nameResponse.data.country.length < 1) {
        setLoading(false)
        return alert("cannot find your name in database")
      }
      setSearchedname(name)

      const nameCountries = nameResponse.data.country.map((input: { country_id: string, probability: string }) => input.country_id)
      const nameProbabilities = nameResponse.data.country.map((input: { country_id: string, probability: string }) => input.probability);
      let convertedNameCountries = []
      for (let i = 0; i < nameCountries.length; i++) {
        convertedNameCountries.push(nameCountries[i] + "|")
      }

      setChartUrl(`https://image-charts.com/chart?cht=p3&chs=700x100&chd=t:${nameProbabilities}&chl=${convertedNameCountries}&chan&chf=ps0-0,lg,45,ffeb3b,0.2,f44336,1|ps0-1,lg,45,8bc34a,0.2,009688,1`)
    } catch (err) {
      console.log(err);
    } finally {
      setShowImg(true)
    }
  }

  const nameInputRef = useRef<HTMLInputElement>(null)

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault()
    fetchData(nameInputRef.current!.value)
  }

  const [imgLoading, setImgLoading] = useState<boolean>(false)

  const onLoadHandler = () => {
    setLoading(false)
    setImgLoading(false)
    setShowText(true)
  }


  return (
    <div className="pageWrapper" onSubmit={submitHandler}>
      <section className='main-card'>
        <form action="submit" className='form'>
          <input type="text" placeholder='ENTER A NAME' ref={nameInputRef} />
          <button>SUBMIT</button>
        </form>
        <div className='response'>
          <p className='main-para' hidden={!showText}>{`Sowing results for: ${searchedname}`}</p>
          {/* @ts-ignore */}
          <ClipLoader loading={loading && imgLoading} />
          <img className='main-img' src={chartUrl} hidden={!showImg && !imgLoading} onLoad={onLoadHandler}></img>
        </div>
      </section>
    </div>
  );
}

export default App;
