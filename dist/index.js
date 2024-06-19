"use strict";
const roleElement = document.querySelector("#role");
const roles = ["web", "back-end", "front-end", "fullstack"];
class Role {
    constructor(RoleElement, Roles, StrTime = 200) {
        this.roleElement = RoleElement;
        this.roles = Roles;
        this.currentIndex = 0;
        this.currentRole = this.roles[this.currentIndex];
        this.currentText = `${this.currentRole} developer`;
        this.isDeleting = false;
        this.countText = this.currentText.length;
        this.strTime = StrTime;
        this.intervalId = setInterval(() => {
            this.changeRole();
            this.changeInterval();
        }, this.strTime);
    }
    changeRole() {
        let text = `${this.currentRole} developer`;
        if (this.isDeleting) {
            if (this.countText > 0) {
                this.currentText = this.currentText.substring(0, this.countText);
                this.countText--;
            }
            else {
                setTimeout(() => {
                    this.isDeleting = false;
                    this.currentIndex = ++this.currentIndex % this.roles.length;
                    this.currentRole = this.roles[this.currentIndex];
                }, this.strTime * 2);
            }
        }
        else {
            if (this.countText < text.length) {
                this.currentText = text.substring(0, this.countText + 1);
                this.countText++;
            }
            else {
                setTimeout(() => {
                    this.isDeleting = true;
                }, this.strTime * 2);
            }
        }
        this.roleElement.innerHTML = `${this.currentText}`;
    }
    ;
    changeInterval(newInterval = 100 * Math.ceil(Math.random() * 8)) {
        clearInterval(this.intervalId);
        this.intervalId = setInterval(() => {
            this.changeRole();
            this.strTime = newInterval;
            this.changeInterval();
        }, this.strTime);
    }
    ;
}
const roleChange = new Role(roleElement, roles);
