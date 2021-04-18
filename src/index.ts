[...document.querySelectorAll(".page.group Table > tbody > tr:not(.row1)")].map(tr => ({
    srlv:parseInt(tr.parentNode.querySelector(".row1").innerText.match(/Lv(\d+)/)[1]),
    bgcolor:tr.querySelector(".col0").getAttribute("bgcolor"),
    lv:tr.querySelector(".col0").innerText,
    genre:tr.querySelector(".col1 .wikilink1").innerText,
    bpm:tr.querySelector(".col2").innerText,
    
}))