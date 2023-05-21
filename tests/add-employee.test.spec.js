import {test, expect} from '@playwright/test';

const {Util} = require('../util');
const {SidePanel} = require('../pages/sidePanel');
const {StartPage} = require('../pages/startPage');
const {PIM} = require('../pages/pim');
import {employees} from '../test-data/employee.json';

test.describe('Adding employees to system', () => {

  test('Add an employee', async ({page}) => {
    const firstName = 'First';
    const middleName = 'Middle';
    const surName = 'Surname';
    const startPage = new StartPage(page);
    await startPage.goToHomepage();
    await startPage.loginAsAdmin();
    await testAddUser({page}, firstName, middleName, surName);
  });

  test('Add an employee from a data file', async ({page}) => {
    const startPage = new StartPage(page);
    await startPage.goToHomepage();
    await startPage.loginAsAdmin();
    for (let i = 0; i < employees.length; i++) {
      const firstName = employees[i].firstName;
      const middleName = employees[i].middleName;
      const surName = employees[i].surname;
      await startPage.goToHomepage();
      await testAddUser({page}, firstName, middleName, surName);
    }
  });

  async function testAddUser({page}, firstName, middleName, surName) {
    const employeeId = new Util().getRandomNumber();
    const sidePanel = new SidePanel(page);
    await sidePanel.clickOnPIMItem();
    const pim = new PIM(page);
    await pim.clickAddButton();
    await pim.enterEmployeeDetails(firstName, middleName, surName, employeeId);
    await expect(page.getByText(`${firstName} ${surName}`)).toBeVisible({timeout: 20000});
    await pim.submitEmployee(firstName, middleName, surName, employeeId);
    await pim.assertEmployeeIsRegistered(firstName, middleName, surName, employeeId);
  }

});








