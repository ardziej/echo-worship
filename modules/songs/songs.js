exports.myDateTime = function () {
    return Date()
}

let sequence = require('../../s3/db/sequence.json')

exports.getSequence = function () {

    Object.keys(sequence).forEach(key => {
        if (sequence[key]['type'] === 'song') {
            let songContent = require(sequence[key]['path'])
            let songSequnce = songContent.sequence
            if (songSequnce) {
                sequence[key]['song'] = songContent
                let song = []
                let osc = []
                Object.keys(songContent.lyrics).forEach(keyS => {
                    let os = []
                    Object.keys(songContent.lyrics[keyS].parts).forEach(keyP => {
                        part = []
                        Object.keys(songContent.lyrics[keyS].parts[keyP]).forEach(keyT => {
                            part.push(songContent.lyrics[keyS].parts[keyP][keyT].text)
                        })
                        t = {
                            "id": songContent.lyrics[keyS].id,
                            "text": part
                        }
                        song.push(t)
                        os.push(part)
                    })
                    let m = {
                        "id": t.id,
                        "text": os
                    }
                    osc[t.id] = m
                })

                let orderSong = []
                Object.keys(songSequnce).forEach(seq => {
                    let songKey = songSequnce[seq].id
                    orderSong.push(osc[songKey])
                })
                sequence[key]['song']['orderSong'] = song
                let songNew = []
                let songText = ''
                Object.keys(orderSong).forEach(keyS => {
                    part = []
                    Object.keys(orderSong[keyS].text).forEach(keyP => {
                        txt = []
                        ts = ''
                        Object.keys(orderSong[keyS].text[keyP]).forEach(keyT => {
                            txt.push(orderSong[keyS].text[keyP][keyT])
                            ts += orderSong[keyS].text[keyP][keyT] + '\n'
                        })
                        t = {
                            "id": orderSong[keyS].id,
                            "text": txt,
                            "autoSlide": null
                        }
                        songNew.push(t)
                        songText += '[' + orderSong[keyS].id + ']' + '\n' + ts + '\n'
                    })
                })
                sequence[key]['song']['prompterSequence'] = songNew
                sequence[key]['song']['songText'] = songText
            }
            else {
                sequence[key]['song'] = songContent
                let song = []
                Object.keys(songContent.lyrics).forEach(keyS => {
                    Object.keys(songContent.lyrics[keyS].parts).forEach(keyP => {
                        part = []
                        Object.keys(songContent.lyrics[keyS].parts[keyP]).forEach(keyT => {
                            part.push(songContent.lyrics[keyS].parts[keyP][keyT].text)
                        })
                        t = {
                            "id": songContent.lyrics[keyS].id,
                            "text": part
                        }
                        song.push(t)
                    })
                })
                sequence[key]['song']['prompterSequence'] = song
            }
        }
    })

    return sequence
}