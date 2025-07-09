import React from 'react'

export default function CatCard({ cat, onBan }) {
  if (!cat) return null

  return (
    <div className="card">
      <h2>{cat.name}</h2>
      <div className="tags">
        {cat.breeds?.map(breed => (
          <button key={breed.name} onClick={() => onBan(breed.name)}>{breed.name}</button>
        ))}
        {cat.breeds?.map(breed => (
          <>
            <button onClick={() => onBan(breed.origin)}>{breed.origin}</button>
            <button onClick={() => onBan(`${breed.weight.metric} lbs`)}>{breed.weight.metric} lbs</button>
            <button onClick={() => onBan(`${breed.life_span} years`)}>{breed.life_span} years</button>
          </>
        ))}
      </div>
      <img src={cat.url} alt="Cat" style={{ maxWidth: '300px', marginTop: '1em' }} />
    </div>
  )
}
