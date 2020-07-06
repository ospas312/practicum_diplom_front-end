export class UserInfo {
  constructor(form, name, job, api) {
    this.avatar = document.querySelector('.user-info__photo');
    this.form = form;
    this.name = name;
    this.job = job;
    this.api = api;
    this.userName = '';
    this.userAbout = '';
    this.userAvatar = '';
  }
 loadUserInfo() {
    this.api.getUserInfo()
      .then(user => {
        this.userName = user.name;
        this.userAbout = user.about;
        this.userAvatar = user.avatar;
        this.mainUserInfo();
      })
      .catch((err) => {
        alert(`Ой ошибка ${err.status}`);
        throw new Error(" Ого, ошибка! o_O");
      });

  }
  mainUserInfo() {
    this.name.textContent = this.userName;
    this.job.textContent = this.userAbout;
    this.avatar.style.backgroundImage = 'url(' + this.userAvatar + ')';
  }
  setUserInfo() {
    this.form.user.value = this.userName;
    this.form.job.value = this.userAbout;
    this.form.lastElementChild.removeAttribute('disabled');
  }
  updateUserInfo() {
    return this.api.sendUserInfo(this.form.user.value, this.form.job.value)
      .then((user) => {
        this.userName = user.name;
        this.userAbout = user.about;
        this.mainUserInfo();
      })
      .catch((err) => {
        alert(`Ой ошибка ${err.status}`);
        throw new Error(" Ого, ошибка! o_O");
      });
  }
}



