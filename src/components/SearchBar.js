import React from 'react'; 

export default function SearchBar(props) {
  return (
    <div class='controls'>
  <div class='query'>
    <form id="query-form" method="post">
      <textarea id='query-textarea' name='Text1' cols='200' rows='5' autocomplete='on' autofocus='true' spellcheck='false'></textarea>
      <input type="submit" value="Search the Graph"/>
    </form>
  </div>
  <div class='layout'>
    <button id='grid-force-button'>grid force</button>
    <button id='bounded-force-button'>bounded force</button>
  </div>
</div>
  )
}