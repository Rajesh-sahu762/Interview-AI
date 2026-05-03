import { generateInterviewReport, getAllInterviewReports, getInterviewReport } from "../Services/Interview.api";
import { useContext, useState } from "react";
import { InterviewContext } from "../Interview.context";

export function useInterview() {
    const context = useContext(InterviewContext);

    if (!context) {
        throw new Error("useInterview must be used within an InterviewProvider");
    }

    const { reports, setReports, report, setReport, loading, setLoading } = context;

    const generateReport = async (formData) => {
        setLoading(true);
        try {
            const data = await generateInterviewReport(formData);
            setReport(data.report);
            // Add the new report to the list of reports
            setReports(prevReports => [data.report, ...prevReports]);
            return data;
        } catch (error) {
            console.error("Error generating interview report:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    }

    const getReports = async () => {
        setLoading(true);
        try {
            const data = await getAllInterviewReports();
            setReports(data.reports);
        } catch (error) {
            console.error("Error fetching interview reports:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const getInterviewReportById = async (reportId) => {
        setLoading(true);
        try {
            const data = await getInterviewReport(reportId);
            setReport(data.report);
        } catch (error) {
            console.error("Error fetching interview report:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return {
        reports,
        report,
        loading,
        generateReport,
        getReports,
        getInterviewReportById,
    };

}
