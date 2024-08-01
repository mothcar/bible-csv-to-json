(async () => {
  const csvFilePath = "./bible22.csv";
  const csv = require("csvtojson");
  const fs = require('fs');
  //   const converter = csv({
  //     noheader: true,
  //     // delimiter: '\n',
  //     delimiter: ",",
  //   });

  const customHeaders = ['any', 'chapter', 'content'];

  const csvParserParams = {
    delimiter: "\t", // 탭을 구분자로 지정
    quote: "off", // 따옴표 처리 비활성화 (필요에 따라 조정 가능)
    noheader: true, // 헤더가 없는 경우 true, 있는 경우 false
    trim: true, // 각 필드의 앞뒤 공백 제거
    headers: customHeaders // 사용자 정의 헤더 사용
  };

  csv(csvParserParams)
    .fromFile(csvFilePath)
    .then((jsonArray) => {
        console.log(jsonArray.length);
        console.log('Origin : ', jsonArray)
        let newmap = {};
        let number = 1
        jsonArray.map(
          (element, n) => {
            let any = element['any'];
            // delete element['First Name'];
            if(any) {
              newmap[number] = element.any;   
              number += 1
            }       
          }
        );
        console.log('newmap : ', newmap)

        // let ret = []
        // for(let i = 0; i<jsonArray.length; i++) {
        //   ret.push(jsonArray[i]+n)
        // }

        // console.log('Ret : ', ret)

        // jsonArray.forEach((item, n)=>{
          
        //   if(item['chapter'] in item) {
        //     console.log('Item : ', item)
        //   }
        // })

        // JSON 결과를 파일로 저장 (선택사항)
        fs.writeFileSync("output.json", JSON.stringify(newmap, null, 2));
        console.log("JSON 파일이 생성되었습니다: output.json");
      // }
      
    })
    .catch((err) => {
      console.error("에러 발생:", err);
    });
})();
