const fs = require('fs');

var inputFilePath = "D:\\XYZ\\Test\\serverlist.txt";
const GroupList=[]

try{
    if(fs.existsSync(inputFilePath))
    {
        console.log("this file exists       #existsSync(path)")
        
        var inputFileContent= fs.readFileSync(inputFilePath,'utf8')

        if(inputFileContent != null){
          
            let strArr = inputFileContent.split('\r\n')
            if(strArr != null && strArr.length > 0){
                computeServerList(strArr,GroupList)
                GenerateReport(GroupList)
            }else{
                console.log("there is no content")
            }
        }
    }
}catch(err){
    console.error(err)
}

function isGroupName(str){
    return str.charAt(0) == '[' && str.endsWith(']') ? true : false;
}


function computeServerList(strArr,GroupList)
{
    if(!isGroupName(strArr[0])){
    console.log("Invalid data format at first line. expecting a group name in the format [<GroupName>]")
    }
    let counter = -1
    var prevGrpName ="";
    for(let str in strArr)
    {
        if(isGroupName(strArr[str])){    
                
            if(str == 0){
                counter = 0;
                prevGrpName=strArr[str].slice(1,-1);
            }else{            
                GroupList.push({ "name":prevGrpName , "ServerCount":counter})
                prevGrpName=strArr[str].slice(1,-1);
                counter = 0;        
            }
        }else{
            counter++
        }
        if((strArr.length-1) == str)
        {
            GroupList.push({ "name":prevGrpName , "ServerCount":counter})
        }
    }    
}

function GenerateReport(groupList)
{
  
    if (groupList != null && groupList.length > 0){
        console.log("you have "+ groupList.length+ " groups")
      
        var result = "they are ";
        for(let item of groupList)
        {
            result += item.name+', '
        }
        console.log(result.substring(0,result.length-2));

        groupList.forEach(grpArray2)
        //(currentValue, index, arr) => { ) } )
       
    } else {
        console.log("Server list is empty")
    }
}

function grpArray(currentValue, index, arr)
{   
    var result = currentValue+', '
   
}

function grpArray2(currentValue, index, arr)
{ 
    console.log("In "+currentValue.name+ " you have "+ currentValue.ServerCount + " servers")
}
