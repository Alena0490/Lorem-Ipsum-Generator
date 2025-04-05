import data from "./data"
import { useState, useEffect, useRef } from "react"

const App = () => {
  const [count, setCount] = useState(0)
  const [paragraphs, setParagraphs] = useState([])

  const articleRef = useRef(null)

  const submitForn = (e) => {
    e.preventDefault()
    let amount = parseInt(count)

    if (amount < 0) {
      amount = 1
    } else if (amount > 5) {
      amount = 5
    }

    setParagraphs(data.slice(0, amount))
  }

  useEffect(() => {
    if (articleRef.current) {
      // restart animace
      articleRef.current.classList.remove("fade-in")
      void articleRef.current.offsetWidth // force reflow
      articleRef.current.classList.add("fade-in")
    }
  }, [paragraphs])

  return (
    <section className="form-section">
      <h2>Lorem Ipsum Generator</h2>
      <form onSubmit={submitForn}>
        <label htmlFor="paragraphs">Paragraphs</label>
        <input
          type="number"
          id="paragraphs"
          onChange={(e) => setCount(e.target.value)}
        />
        <input type="submit" value="Generate" />
      </form>

      <article ref={articleRef}>
      {paragraphs.map((text, index) => (
        <p
          key={index}
          className="paragraph"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          {text}
        </p>
      ))}
      </article>
    </section>
  )
}

export default App
