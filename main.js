const form = document.querySelector(".form")
const submit = document.querySelector("#submit")

function getFormData (e)
{
  e.preventDefault()
  var formData = new FormData(form)

  let h = formData.get("house")
  let s = formData.get("street")
  let c = formData.get("city")
  let s2 = formData.get("state")
  let z = formData.get("zip")

  var data = {
    housenumber: h,
    street: s,
    city: c,
    state: s2,
    postcode: z,
    format: "json",
    apiKey: "fff9331e1eca47bf87c94e2b215ec4e8"
  }

  // (B) MANUAL CONSTRUCT URL & PARAMS
  var url = "https://api.geoapify.com/v1/geocode/search?"
  for (let k in data)
  {
    url += k + "=" + data[ k ] + "&"
  }
  fetch(url)
    .then((result) => result.json())
    .then((data) =>
    {
      let lat2 = data.results[ 0 ].lat
      let lon2 = data.results[ 0 ].lon
      let lat1 = 33.74762
      let lon1 = -84.402039

      Number.prototype.toRad = function ()
      {
        return (this * Math.PI) / 180
      }

      var R = 6371 // km
      //has a problem with the .toRad() method below.
      var x1 = lat2 - lat1
      var dLat = x1.toRad()
      var x2 = lon2 - lon1
      var dLon = x2.toRad()
      var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1.toRad()) *
        Math.cos(lat2.toRad()) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2)
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
      var d = (R * c) / 1.609
      var e = d.toFixed(1)


      const discount1 = document.querySelector('#discount-hero')
      const discount2 = document.querySelector('#discount-hero-2')


      if (e > 2)
      {
        discount2.classList.remove('no-display')
        discount1.classList.add('no-display')
      } else if (e < 2)
      {
        discount1.classList.remove('no-display')
        discount2.classList.add('no-display')
      }
    })
}

submit.addEventListener("click", getFormData, false)
