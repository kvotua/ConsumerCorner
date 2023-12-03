export const useDownload = (fileName: string, url: string) => {
  fetch(url)
    .then((res) => res.blob())
    .then((blob) => {
      var element = document.createElement("a")
      element.href = window.URL.createObjectURL(blob)
      element.setAttribute("download", fileName + ".svg")
      element.style.display = "none"
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
    })
}
