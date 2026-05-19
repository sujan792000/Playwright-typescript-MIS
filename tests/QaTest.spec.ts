// import { test, expect } from './fixtures';

//   const csv = [
//     'Address,Latitude,Longitude,Property value',
//     '123 Main St,37.7749,-122.4194,850000',
//     '456 Oak Ave,37.7849,-122.4094,920000',
//     '789 Pine Rd,37.7649,-122.4294,750000',
//   ].join('\n');

//   const invalidCsv = [
//     'Addr,Lat,Lon,Value',
//     '123 Main St,37.7749,-122.4194,850000',
//     '456 Oak Ave,37.7849,-122.4094,920000',
//     '789 Pine Rd,37.7649,-122.4294,750000',
//   ].join('\n');

//   const csvOneRow = [
//     'Address,Latitude,Longitude,Property value',
//     '123 Main St,37.7749,-122.4194,850000',
//   ].join('\n');



// test.beforeEach(async ({ page }) => {
//   await page.goto('/');
// });

// test('happy path: valid CSV loads markers onto the map',{tag:'@happypath'}, async ({ page, fileUpload }) => {
//   await fileUpload.uploadCSV(csv);
//   await page.waitForTimeout(2000);
//     //Verfiy property uploaded successfully mesage is visible
//     await expect(page.locator('text=Properties uploaded successfully')).toBeVisible();

//   // All three addresses should appear in the sidebar
//   await expect(page.locator('text=123 Main St')).toBeVisible();
//   await expect(page.locator('text=456 Oak Ave')).toBeVisible();
//   await expect(page.locator('text=789 Pine Rd')).toBeVisible();

//   // Map should be rendered
//   await expect(page.locator('.leaflet-container')).toBeVisible();

//   //To do verify that 3 markers are present on the map
//     await expect(page.locator('.leaflet-marker-icon')).toHaveCount(3);

// });


// test('wrong column names: uploads but nothing appears', async ({ page, fileUpload }) => {
//      await fileUpload.uploadCSV(invalidCsv);
//   await page.waitForTimeout(2000);

//   await expect(page.getByText('No valid properties found in CSV')).toBeVisible();

// });

// test('single-row CSV: the only property is not shown', async ({ page, fileUpload }) => {
//     await fileUpload.uploadCSV(csv[0]);
//      await page.waitForTimeout(2000);

//      await expect(page.getByText('No valid properties found in CSV')).toBeVisible();
//      await expect(page.getByText('No properties loaded')).toBeVisible();
//      await expect(page.getByText('No valid properties found in CSV')).toBeVisible();
//      await expect(page.locator('.leaflet-container')).toBeVisible();
//      await  expect(page.locator('.leaflet-marker-icon')).toHaveCount(0);

// });

// test('stats API returns expected fields', async ({ page, fileUpload }) => {
//   // TODO: use page.request.get('/api/stats') and assert that
//   // count, average, min, max, and median are present in the response

//   await fileUpload.uploadCSV(csv);
//   await page.waitForTimeout(2000);
//     const response = await page.request.get('/api/stats');
//     expect(response.status()).toBe(200);
//     const data = await response.json();
//     expect(data).toHaveProperty('count');
//     expect(data).toHaveProperty('average');
//     expect(data).toHaveProperty('min');
//     expect(data).toHaveProperty('max');
//     expect(data).toHaveProperty('median');

// });

// test('Get all properties', async ({ page, fileUpload }) => {
//   await fileUpload.uploadCSV(csv);
//   await page.waitForTimeout(2000);
//     const response = await page.request.get('/api/properties');
//     expect(response.status()).toBe(200);
//     const data = await response.json();
//     data.forEach((property: any) => {
//       expect(property).toHaveProperty('address');
//       expect(property).toHaveProperty('latitude');
//       expect(property).toHaveProperty('longitude');
//       expect(property).toHaveProperty('value');
//     });
 
// });






