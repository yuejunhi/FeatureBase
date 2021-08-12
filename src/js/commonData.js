// 英语题型题材数据信息
var tQTypeGenreDataObj = [{
  value: 'E',
  label: '听力选择',
  children: [{
    value: 1,
    label: '听单句'
  }, {
    value: 2,
    label: '听短对话'
  }, {
    value: 3,
    label: '听长对话'
  }, {
    value: 4,
    label: '听短文'
  }, {
    value: 30,
    label: '听句子选信息'
  }, {
    value: 31,
    label: '听句子选图片'
  }, {
    value: 37,
    label: '听句子选答语'
  }, {
    value: 63,
    label: '听新闻'
  }, {
    value: 64,
    label: '听会话'
  }, {
    value: 72,
    label: '听对话选图片'
  }]
}, {
  value: 'F',
  label: '听力判断',
  children: [{
    value: 0,
    label: '默认(无)'
  }]
}, {
  value: 'G',
  label: '听力简答',
  children: [{
    value: 0,
    label: '默认(无)'
  }]
}, {
  value: 'x',
  label: '听力匹配',
  children: [{
    value: 66,
    label: '听力匹配'
  },{
    value: 67,
    label: '听力排序'
  }]
}, {
  value: 'A',
  label: '单选题',
  children: [{
    value: 13,
    label: '单选题'
  },{
    value: 14,
    label: '翻译选择'
  },{
    value: 32,
    label: '单词辨音'
  },{
    value: 33,
    label: '词义辨析'
  }]
}, {
  value: 'C',
  label: '完形填空',
  children: [{
    value: 61,
    label: '语法选择'
  },{
    value: 62,
    label: '完形填空'
  },{
    value: 79,
    label: '对话选择'
  }]
}, {
  value: 'D',
  label: '阅读理解',
  children: [{
    value: 29,
    label: '阅读判断'
  },{
    value: 28,
    label: '阅读理解'
  }]
}, {
  value: 'm',
  label: '匹配题',
  children: [{
    value: 15,
    label: '词汇匹配'
  },{
    value: 16,
    label: '对话匹配'
  },{
    value: 17,
    label: '短文匹配'
  },{
    value: 87,
    label: '英文释义匹配'
  }]
}, {
  value: 'W',
  label: '听写',
  children: [{
    value: 18,
    label: '词汇听写'
  },{
    value: 19,
    label: '短文听写'
  }]
}, {
  value: 'S',
  label: '听力填空',
  children: [{
    value: 0,
    label: '默认(无)'
  }]
}, {
  value: 'N',
  label: '词汇填空',
  children: [{
    value: 20,
    label: '选词填空'
  },{
    value: 21,
    label: '句子填空'
  },{
    value: 22,
    label: '翻译填空'
  },{
    value: 24,
    label: '改写句子'
  },{
    value: 23,
    label: '短文填空'
  },{
    value: 88,
    label: '单词填写'
  },{
    value: 89,
    label: '词汇替换'
  }]
}, {
  value: 'Q',
  label: '阅读填空',
  children: [{
    value: 44,
    label: '阅读填空'
  }]
}, {
  value: 'V',
  label: '连词成句',
  children: [{
    value: 0,
    label: '默认(无)'
  }]
}, {
  value: 'U',
  label: '改错题',
  children: [{
    value: 46,
    label: '句子改错'
  },{
    value: 47,
    label: '句子定向改错'
  },{
    value: 48,
    label: '短文改错'
  },{
    value: 49,
    label: '短文定向改错'
  }]
}, {
  value: 'g',
  label: '翻译题',
  children: [{
    value: 38,
    label: '句子英译中'
  },{
    value: 39,
    label: '篇章英译中'
  },{
    value: 40,
    label: '句子中译英'
  },{
    value: 41,
    label: '篇章中译英'
  },{
    value: 50,
    label: '句子定向英译中'
  },{
    value: 51,
    label: '句子定向中译英'
  },{
    value: 25,
    label: '英译中'
  },{
    value: 26,
    label: '中译英'
  },{
    value: 27,
    label: '中英互译'
  },{
    value: 80,
    label: '词汇英译中'
  },{
    value: 81,
    label: '词汇中译英'
  },{
    value: 82,
    label: '词汇定向英译中'
  },{
    value: 83,
    label: '词汇定向中译英'
  }]
}, {
  value: 'b',
  label: '补全对话',
  children: [{
    value: 0,
    label: '默认(无)'
  }]
}, {
  value: 'X',
  label: '阅读简答',
  children: [{
    value: 0,
    label: '默认(无)'
  }]
}, {
  value: 'd',
  label: '看图写句子',
  children: [{
    value: 0,
    label: '默认(无)'
  }]
}, {
  value: 'f',
  label: '作文',
  children: [{
    value: 34,
    label: '读后续写'
  },{
    value: 35,
    label: '概要写作'
  },{
    value: 36,
    label: '书面表达'
  },{
    value: 52,
    label: '二选一作文'
  },{
    value: 53,
    label: '看图写作'
  },{
    value: 54,
    label: '应用文写作'
  },{
    value: 55,
    label: '综合写作'
  },{
    value: 84,
    label: '对话写作'
  },{
    value: 90,
    label: '选词创境'
  }]
}, {
  value: 'k',
  label: '阅读综合',
  children: [{
    value: 0,
    label: '默认(无)'
  }]
}, {
  value: 'P',
  label: '阅读匹配',
  children: [{
    value: 42,
    label: '阅读匹配'
  },{
    value: 43,
    label: '段落排序'
  },{
    value: 45,
    label: '多项对应'
  }]
}, {
  value: 'H',
  label: '复合题',
  children: [{
    value: 78,
    label: '复合写作'
  },{
    value: 85,
    label: '复合阅读'
  },{
    value: 86,
    label: '句子改写'
  }]
}];
// 学科信息
var subjectDataObj=[{
  value: 'A',
  label: '语文'
  }, {
    value: 'B',
    label: '数学'
  }, {
    value: 'C',
    label: '英语'
  }, {
    value: 'D',
    label: '物理'
  }, {
    value: 'E',
    label: '化学'
  }, {
    value: 'F',
    label: '生物'
  }, {
    value: 'G',
    label: '政治'
  }, {
    value: 'H',
    label: '历史'
  }, {
    value: 'I',
    label: '地理'
  }];
// var allData = [];
import axios from 'axios'
var getAllData = function(){
  axios({
    method:'get',  //请求的方式
    url:'http://172.16.63.109:6868/api/BasicInfo/GetBasicInfoDetail',
    headers:{'Content-Type':'application/json'},
  }).then(res=>{
    console.log(res);
    if(res.status==200 && res.data != null && res.data.Status==1){
      // allData = res.data.Data.RecordData;
      localStorage.setItem('allData',JSON.stringify(res.data.Data));
    }
  }).catch(error=>{
    console.log(error)
  })
  axios({
    method:'get',  //请求的方式
    url:'http://172.16.63.109:6868/api/BasicInfo/GetSubjectDetail',
    headers:{'Content-Type':'application/json'},
  }).then(res=>{
    console.log(res);
    if(res.status==200 && res.data != null && res.data.Status==1){
      // allData = res.data.Data.RecordData;
      localStorage.setItem('subjecData',JSON.stringify(res.data.Data));
    }
  }).catch(error=>{
    console.log(error)
  })
}
// getAllData();
// localStorage.setItem('featureTypes',JSON.stringify(featureTypes));
export default {tQTypeGenreDataObj,subjectDataObj}
