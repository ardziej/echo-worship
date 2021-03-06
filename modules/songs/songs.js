exports.myDateTime = function () {
    return Date()
}

let sequence = require('../../s3/db/sequence.json')

function getFilenameAndExtension(pathfilename) {

    var filenameextension = pathfilename.replace(/^.*[\\\/]/, '');
    var filename = filenameextension.substring(0, filenameextension.lastIndexOf('.'));
    var ext = filenameextension.split('.').pop();

    return [filename, ext];

}

exports.getSequence = function () {

    Object.keys(sequence).forEach(key => {
        if (sequence[key]['type'] === 'song') {
            let songContent = require('../../s3/db/songs/' + sequence[key]['path'])
            let songSequnce = songContent.sequence
            if (songSequnce) {
                sequence[key]['song'] = songContent
                let song = []
                let osc = []
                Object.keys(songContent.lyrics).forEach(keyS => {
                    let os = []
                    let ot = []
                    Object.keys(songContent.lyrics[keyS].parts).forEach(keyP => {
                        part = []
                        time = []
                        Object.keys(songContent.lyrics[keyS].parts[keyP]).forEach(keyT => {
                            part.push(songContent.lyrics[keyS].parts[keyP][keyT].text)
                            valt = songContent.lyrics[keyS].parts[keyP][keyT].time
                            if (typeof (valt) === 'undefined') {
                                valt = 0
                            }
                            time.push(valt)
                        })
                        t = {
                            "id": songContent.lyrics[keyS].id,
                            "text": part,
                            "time": time
                        }
                        song.push(t)
                        os.push(part)
                        ot.push(time)
                    })
                    let m = {
                        "id": t.id,
                        "text": os,
                        "time": ot
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
                        //console.log(orderSong[keyS])
                        txt = []
                        times = []
                        ts = ''
                        Object.keys(orderSong[keyS].text[keyP]).forEach(keyT => {
                            txt.push(orderSong[keyS].text[keyP][keyT])
                            //console.log(orderSong[keyS])
                            times.push(orderSong[keyS].time[keyP][keyT])
                            ts += orderSong[keyS].text[keyP][keyT] + '\n'
                        })
                        t = {
                            "id": orderSong[keyS].id,
                            "text": txt,
                            "autoSlide": null,
                            "timeSlide": times,
                            "time": 1000
                        }
                        //console.log(t);
                        songNew.push(t)
                        songText += '[' + orderSong[keyS].id + ']' + '\n' + ts + '\n'
                    })
                })
                sequence[key]['song']['prompterSequence'] = songNew
                sequence[key]['song']['songText'] = songText
            } else {
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
        } else if (sequence[key]['type'] === 'slide') {
            Object.keys(sequence[key]['slides']).forEach(keyV => {
                if (sequence[key]['slides'][keyV].type === 'video') {
                    let file_name = sequence[key]['slides'][keyV].path
                    let thumb_dir = getFilenameAndExtension(file_name)[0]
                    sequence[key]['slides'][keyV].thumbdir = thumb_dir
                }

            })
        }

    })

    return sequence
}