const roleElement:HTMLElement=document.querySelector("#role") as HTMLElement;
const roles : Array<string> = ["web", "back-end", "front-end", "fullstack"];

interface IRole {
    roleElement:HTMLElement;
    roles:Array<string>;
    currentRole:string;
    currentIndex:number;
    currentText:string;
    isDeleting:boolean;
    countText:number;
    strTime:number;

    changeRole : () => void;
    changeInterval : (newInterval?: number) => void;
}

class Role implements IRole{
    roleElement: HTMLElement;
    roles: Array<string>;
    currentRole: string;
    currentIndex: number;
    currentText: string;
    isDeleting: boolean;
    countText: number;
    strTime: number;
    intervalId: number;
    constructor(RoleElement:HTMLElement, Roles : Array<string>, StrTime : number = 200){
        this.roleElement=RoleElement;
        this.roles=Roles;
        this.currentIndex=0;
        this.currentRole=this.roles[this.currentIndex];
        this.currentText=`${this.currentRole} developer`;
        this.isDeleting=false;
        this.countText=this.currentText.length;
        this.strTime=StrTime;
        this.intervalId=setInterval(()=>{
            this.changeRole();
            this.changeInterval();
        }, this.strTime);
    }
    changeRole ():void {
        let text: string=`${this.currentRole} developer`;

        if(this.isDeleting) {
            if(this.countText>0){
                this.currentText = this.currentText.substring(0, this.countText);
                this.countText--;
            }else{
                setTimeout(() => {
                    this.isDeleting=false;
                    this.currentIndex= ++this.currentIndex % this.roles.length;
                    this.currentRole = this.roles[this.currentIndex];
                }, this.strTime * 2);
            }
        }else{
            if(this.countText < text.length){
                this.currentText=text.substring(0, this.countText+1);
                this.countText++;
            }else{
                setTimeout(() => {
                    this.isDeleting=true;
                }, this.strTime * 2);
            }
        }
        this.roleElement.innerHTML=`${this.currentText}`;
    };
    changeInterval (newInterval: number = 100 * Math.ceil(Math.random() * 8)) : void {
        clearInterval(this.intervalId);
        this.intervalId = setInterval(()=>{
            this.changeRole();
            this.strTime=newInterval;
            this.changeInterval();
        }, this.strTime);
    };

}


const roleChange : IRole = new Role(roleElement, roles);