import React, { useEffect, useState } from 'react'

export default function App() {
  const [cat, setCat] = useState(null)
  const [banList, setBanList] = useState([])

  const fetchCat = async () => {
    let retries = 10

    while (retries > 0) {
      const res = await fetch('https://api.thecatapi.com/v1/images/search?has_breeds=1', {
        headers: {
          'x-api-key': import.meta.env.VITE_CAT_API_KEY
        }
      })

      const data = await res.json()
      const result = data[0]
      const breed = result?.breeds?.[0]

      if (!breed) {
        retries--
        continue
      }

      const attrs = [breed.name, breed.origin, `${breed.life_span} years`]
      const banned = attrs.some(attr => banList.includes(attr))

      if (banned) {
        retries--
        continue
      }

      setCat(result)
      return
    }

    setCat(null)
    alert("Too many filters! Try removing something from your ban list.")
  }

  useEffect(() => {
    fetchCat()
  }, [])

  const addToBanList = (value) => {
    if (!banList.includes(value)) {
      setBanList([...banList, value])
    }
  }

  const removeFromBanList = (value) => {
    setBanList(banList.filter(item => item !== value))
  }

  return (
    <div className="container">
      <div className="card">
        <h1>Trippin' on Cats</h1>
        <p>Discover cats from your wildest dreams!</p>
        <div>😺😻😽🙀😹😸😼</div>

        {cat && (
          <>
            <h2>{cat.breeds[0].name}</h2>
            <div>
              <button className="tag" onClick={() => addToBanList(cat.breeds[0].name)}>
                {cat.breeds[0].name}
              </button>
              <button className="tag" onClick={() => addToBanList(`${cat.breeds[0].weight.metric} lbs`)}>
                {cat.breeds[0].weight.metric} lbs
              </button>
              <button className="tag" onClick={() => addToBanList(cat.breeds[0].origin)}>
                {cat.breeds[0].origin}
              </button>
              <button className="tag" onClick={() => addToBanList(`${cat.breeds[0].life_span} years`)}>
                {cat.breeds[0].life_span} years
              </button>
            </div>

            <img src={cat.url} alt="Cat" className="cat-image" />
          </>
        )}

        <button style={{ marginTop: '1rem' }} onClick={fetchCat}>🔁 Discover!</button>

        <div style={{ marginTop: '2rem' }}>
          <h3>🚫 Ban List</h3>
          {banList.map((item, idx) => (
            <button key={idx} className="ban-button" onClick={() => removeFromBanList(item)}>
              ❌ {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  )

}
