//Internal Lib Import
const catchAsync = require('../utils/catchAsync');
const { dashboardService } = require('../services');

/**
 * @desc dashboard summary
 * @access private
 * @route /api/v1/dashboard/dashboardSummary
 * @methud GET
 */

const dashboardSummary = catchAsync(async (req, res) => {
  const data = await dashboardService.dashboardSummary(req);
  res.json({ status: true, message: null, data });
});

module.exports = {
  dashboardSummary,
};
