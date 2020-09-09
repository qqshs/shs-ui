/*
 Validid is open source in:
 https://github.com/Edditoria/validid
 under MIT license:
 https://github.com/Edditoria/validid/blob/master/LICENSE.md
 */
const Validid = (function() {
  function Validid() {
  }

  Validid.prototype.tools = {
    normalize: function(id) {
      var re
      re = /[-\/\s]/g
      id = id.toUpperCase().replace(re, '')
      re = /\([A-Z0-9]\)$/
      if (re.test(id)) {
        id = id.replace(/[\(\)]/g, '')
      }
      return id
    },
    isDateValid: function(idDate, minDate, maxDate) {
      var isFormatValid, parseDate
      if (minDate == null) {
        minDate = 'default'
      }
      if (maxDate == null) {
        maxDate = 'today'
      }
      if (minDate === 'default' || minDate === '') {
        minDate = '18991129'
      }
      isFormatValid = function(date) {
        return typeof date === 'string' && /^[0-9]{8}$/.test(date)
      }
      if (!isFormatValid(idDate)) {
        return false
      }
      if (!isFormatValid(minDate)) {
        return false
      }
      parseDate = function(input) {
        var date, day, isDayValid, isFutureDate, isLeapYear, isMonthValid, maxDay, month, startIndex, year
        startIndex = 0
        year = +input.substring(startIndex, startIndex += 4)
        month = input.substring(startIndex, startIndex += 2)
        day = +input.substring(startIndex, startIndex += 2)
        date = new Date(year, +month - 1, day)
        maxDay = '01,03,05,07,08,10,12'.indexOf(month) >= 0 ? 31 : '04,06,09,11'.indexOf(month) >= 0 ? 30 : (isLeapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0), isLeapYear ? 29 : 28)
        isDayValid = day > 0 && day <= maxDay
        if (!isDayValid) {
          return false
        }
        isMonthValid = +month > 0 && +month <= 12
        if (!isMonthValid) {
          return false
        }
        isFutureDate = new Date() < date
        if (isFutureDate) {
          return false
        }
        return date
      }
      idDate = parseDate(idDate)
      if (idDate === false) {
        return false
      }
      minDate = parseDate(minDate)
      if (minDate === false) {
        return false
      }
      maxDate = maxDate === 'today' ? new Date() : typeof maxDate === 'string' ? parseDate(maxDate) : maxDate
      if (maxDate === false) {
        return false
      }
      return (idDate >= minDate) && (idDate <= maxDate)
    },
    getMaxDate: function(yearsOld) {
      var now, year
      now = new Date()
      year = now.getFullYear() - yearsOld
      return new Date(year, now.getMonth(), now.getDate())
    }
  }

  Validid.prototype.cnid = function(id) {
    var isChecksumValid, isDateValid, isFormatValid, isLengthValid
    isLengthValid = function(id) {
      return id.length === 18
    }
    isFormatValid = function(id) {
      return /^[0-9]{17}[0-9X]$/.test(id)
    }
    isDateValid = (function(_this) {
      return function() {
        return _this.tools.isDateValid(id.substring(6, 14), '18860625')
      }
    })(this)
    isChecksumValid = function(id) {
      var char, checkDigit, getWeight, i, identifier, index, len, remainder, weightedSum
      identifier = id.slice(0, -1)
      checkDigit = id.slice(-1) === 'X' ? 10 : +id.slice(-1)
      getWeight = function(n) {
        return Math.pow(2, n - 1) % 11
      }
      weightedSum = 0
      index = id.length
      for (i = 0, len = identifier.length; i < len; i++) {
        char = identifier[i]
        weightedSum += +char * getWeight(index)
        index--
      }
      remainder = (12 - weightedSum % 11) % 11 - checkDigit
      return remainder === 0
    }
    id = this.tools.normalize(id)
    return isLengthValid(id) && isFormatValid(id) && isDateValid() && isChecksumValid(id)
  }

  Validid.prototype.twid = function(id) {
    var isChecksumValid, isFormatValid, isLengthValid
    isLengthValid = function(id) {
      return id.length === 10
    }
    isFormatValid = function(id) {
      return /^[A-Z][12][0-9]{8}$/.test(id)
    }
    isChecksumValid = function(id) {
      var char, i, idLen, idTail, len, letterIndex, letterValue, letters, remainder, weight, weightedSum
      idLen = id.length
      letters = 'ABCDEFGHJKLMNPQRSTUVXYWZIO'
      letterIndex = letters.indexOf(id[0]) + 10
      letterValue = Math.floor(letterIndex / 10) + (letterIndex % 10) * (idLen - 1)
      idTail = id.slice(1)
      weight = idLen - 2
      weightedSum = 0
      for (i = 0, len = idTail.length; i < len; i++) {
        char = idTail[i]
        weightedSum += +char * weight
        weight--
      }
      remainder = (letterValue + weightedSum + +id.slice(-1)) % 10
      return remainder === 0
    }
    id = this.tools.normalize(id)
    return isLengthValid(id) && isFormatValid(id) && isChecksumValid(id)
  }

  Validid.prototype.hkid = function(id) {
    var getLetterValue, isChecksumValid, isFormatValid, isLengthValid, isLetter
    getLetterValue = function(letter) {
      return letter.charCodeAt(0) - 64
    }
    isLetter = function(char) {
      return /[a-zA-Z]/.test(char)
    }
    isLengthValid = function(id) {
      return id.length === 8 || id.length === 9
    }
    isFormatValid = function(id) {
      return /^[A-MP-Z]{1,2}[0-9]{6}[0-9A]$/.test(id)
    }
    isChecksumValid = function(id) {
      var char, charValue, checkDigit, i, identifier, len, remainder, weight, weightedSum
      weight = id.length
      weightedSum = 0
      identifier = id.slice(0, -1)
      checkDigit = id.slice(-1) === 'A' ? 10 : +id.slice(-1)
      for (i = 0, len = identifier.length; i < len; i++) {
        char = identifier[i]
        charValue = isLetter(char) ? getLetterValue(char) : +char
        weightedSum += charValue * weight
        weight--
      }
      remainder = (weightedSum + checkDigit) % 11
      return remainder === 0
    }
    id = this.tools.normalize(id)
    return isLengthValid(id) && isFormatValid(id) && isChecksumValid(id)
  }

  Validid.prototype.krid = function(id) {
    var isChecksumValid, isDateValid, isFormatValid, isLengthValid
    isLengthValid = function(id) {
      return id.length === 13
    }
    isFormatValid = function(id) {
      return /^[0-9]{13}$/.test(id)
    }
    isDateValid = (function(_this) {
      return function(id) {
        var date, maxDate, sDigit, yearPrefix
        sDigit = id.substring(6, 7)
        yearPrefix = (function() {
          switch (sDigit) {
            case '1':
            case '2':
            case '5':
            case '6':
              return '19'
            case '3':
            case '4':
            case '7':
            case '8':
              return '20'
            default:
              return '18'
          }
        })()
        date = yearPrefix + id.substring(0, 6)
        maxDate = _this.tools.getMaxDate(17)
        return _this.tools.isDateValid(date, 'default', maxDate)
      }
    })(this)
    isChecksumValid = function(id) {
      var char, i, index, len, remainder, weight, weightedSum
      weight = [2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5, 0]
      weightedSum = 0
      index = 0
      for (i = 0, len = id.length; i < len; i++) {
        char = id[i]
        weightedSum += +char * weight[index]
        index++
      }
      remainder = (11 - weightedSum % 11) % 10 - +id.slice(-1)
      return remainder === 0
    }
    id = this.tools.normalize(id)
    return isLengthValid(id) && isFormatValid(id) && isDateValid(id) && isChecksumValid(id)
  }

  Validid.prototype.illegality = function(id) {
    var is, length
    is = function(id) {
      return !/[@#\$%\^&\*]+/.test(id)
    }

    length = function(id) {
      if (id.length > 50) {
        return false
      } else {
        return true
      }
    }

    return is(id) && length(id)
  }

  Validid.prototype.numberOne = function(id) {
    var is
    is = function(id) {
      return /[A-Za-z0-9\-\!\@\#\$\%\^\&\*]+$/.test(id)
    }

    return is(id)
  }

  Validid.prototype.chinese = function(id) {
    var is
    is = function(id) {
      return !/[^\u4E00-\u9FA5]/g.test(id)
    }

    return is(id)
  }

  return Validid
})()
export default new Validid()

// (function() {
//     var Validid, validid;

//     if ((typeof module !== "undefined" && module !== null) && module.exports) {
//       module.exports = validid;
//     }

//     if (typeof window !== "undefined" && window !== null) {
//       window.validid = validid;
//     }

//   }).call(this);
