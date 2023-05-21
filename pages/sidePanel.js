exports.SidePanel = class SidePanel {

  constructor(page) {
    this.pimItem = "div.oxd-layout > div.oxd-layout-navigation > aside > nav > div.oxd-sidepanel-body ul >li>>nth=1",
      this.page = page;
  }

  async clickOnPIMItem() {
    await this.page.waitForSelector(this.pimItem)
    await this.page.locator(this.pimItem).click()
  }

}