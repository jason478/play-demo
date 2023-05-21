const {expect} = require('@playwright/test');

exports.PIM = class PIM {

  constructor(page) {
    this.page = page,
      this.addEmloyeeButtonIdentifier = 'text="Add"',
      this.initialSaveButton = 'text=" Save "',
      this.firstNameIdentifier = "//*[@name='firstName']",
      this.idInFirstRow = ".oxd-table-row > .oxd-table-cell:nth-child(2)",
      this.firstAndMiddleNameInFirstRow = ".oxd-table-row > .oxd-table-cell:nth-child(3)",
      this.surNameInFirstRow = ".oxd-table-row > .oxd-table-cell:nth-child(4)",
      this.searchBtn = '.oxd-form-actions button[type="submit"]',
      this.employeeIdInputField = '.oxd-form-row > div:last-child input.oxd-input'
  }

  async clickAddButton() {
    await this.page.waitForSelector(this.addEmloyeeButtonIdentifier)
    await this.page.locator(this.addEmloyeeButtonIdentifier).click()
    await this.page.waitForSelector(this.firstNameIdentifier, {timeout: 10000});
  }

  async enterEmployeeDetails(firstName, middleName, surname, id) {
    await this.page.waitForSelector(this.firstNameIdentifier);
    await this.page.locator(this.firstNameIdentifier).click();
    await this.page.getByPlaceholder('First Name').fill(firstName);
    await this.page.getByPlaceholder('Middle Name').fill(middleName);
    await this.page.getByPlaceholder('Last Name').fill(surname);
    await this.page.locator(this.employeeIdInputField).fill(id);
    await this.page.locator(this.initialSaveButton).click();
    const ele = this.page.locator("//*[@placeholder='Middle Name']");
    await ele.waitFor({state: "visible"})
  }

  async submitEmployee(firstName, middleName, surname, id) {
    await this.page.getByText('Save').first().click();
    await this.page.getByText('Employee List').first().click();
    await this.page.waitForSelector('text="Employee Information"');
    await this.page.getByPlaceholder('Type for hints...').first().fill(firstName + ' ' + middleName + ' ' + surname);
    await this.page.keyboard.press('Tab');
    await this.page.keyboard.insertText(id);
    await this.page.locator(this.searchBtn).click();
    await this.page.locator("//*[@type='checkbox']").first().waitFor({state: "visible"});
    await this.page.locator(this.searchBtn).click();

  }

  async assertEmployeeIsRegistered(firstName, middleName, surName, id) {
    const firstAndMiddleName = firstName + ' ' + middleName;
    await expect(this.page.locator(this.firstAndMiddleNameInFirstRow)).toHaveText(firstAndMiddleName, {timeout: 10000});
    await expect(this.page.locator(this.surNameInFirstRow)).toHaveText(surName);
    await expect(this.page.locator(this.idInFirstRow)).toHaveText(id);
  }
}