import User from '../models/User.js';
import OverallStats from '../models/OverallStat.js';
import Transactions from '../models/Transaction.js';


export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getDashboardStats = async (req, res) => {
    try {
        //hardcoded for now, will be dynamic later
        const currentMonth = 'November';
        const currentYear = '2021';
        const currentDay = '2021-11-15';

        //Recent 50 Transactions
        const transactions = await Transactions.find({}).limit(50)
            .sort({ createdAt: -1 });

        //OverallStats

        const overallStats = await OverallStats.find({ year: currentYear, });

        const {
            totalCustomers,
            yearlyTotalSoldUnits,
            yearlySalesTotal,
            monthlyData,
            salesByCategory,
            dailyData,
        } = overallStats[0];

        //This Month Stats 

        const thisMonthStats = monthlyData.
            find(({ month }) => month === currentMonth);

        const todayStats = dailyData.
            find(({ date }) => date === currentDay);

        res.status(200).json({
            totalCustomers,
            yearlyTotalSoldUnits,
            yearlySalesTotal,
            monthlyData,
            salesByCategory,
            dailyData,
            thisMonthStats,
            todayStats,
            transactions
        });

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
