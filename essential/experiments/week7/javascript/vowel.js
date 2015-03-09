function isvowel(elem)
 {
  var vowels="aeiouAEIOU";
  var str=elem.value;
  var chr=" ";
  var nIndx=-1;
  var pos=0;
  for(;pos<str.length;pos++)
  { chr=str.charAt(pos);
    if(vowels.indexOf(chr)!=-1)
    {nIndx=vowels.indexOf(chr);
      break;
     }
   }
   if(nIndx>=0)
       document.getElementById("result").innerHTML = ("<h2>The index of first vowel is " + pos + "<br> and character is:" + chr + "</h2>");
   else
       document.getElementById("result").innerHTML = ("<h1>There are no vowels in the string</h1>");
  }
