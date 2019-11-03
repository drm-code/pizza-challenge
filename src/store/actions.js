import Api from './../api/api';

export async function getDashboard() {
  return await Api.getDashboardReport();
}

export async function getProductSummary() {
  return await Api.getData();
}

export async function getOrders() {
  return await Api.getData();
}
