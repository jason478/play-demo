const {expect} = require('@playwright/test');

exports.StartPage = class StartPage {

  constructor(page) {
    this.page = page;
  }

  async goToHomepage() {
    // await this.page.goto(process.env.URL);
    await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php');
    await expect(this.page).toHaveTitle('OrangeHRM');
  }

  async loginAsAdmin() {
    const ele = this.page.locator("//*[@placeholder='Username']");
    await ele.waitFor({state: "visible"});
    await ele.type('Admin');
    await this.page.locator("//*[@placeholder='Password']").type('admin123');
    await this.page.locator("//*[@class='oxd-button oxd-button--medium oxd-button--main orangehrm-login-button']").click();
    await this.page.waitForSelector('text=Time at work');
    await this.page.waitForSelector('text=This week', {timeout: 10000});
  }

}