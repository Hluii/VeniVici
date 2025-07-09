import React from 'react'

export default function BanList({ banList, onUnban }) {
  return (
    <div className="ban-list">
      <h2>Ban List</h2>
      {banList.length === 0 && <p>No bans yet</p>}
      {banList.map((item, idx) => (
        <button key={idx} onClick={() => onUnban(item)}>{item}</button>
      ))}
    </div>
  )
}
