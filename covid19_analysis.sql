CREATE TABLE covid_vaccination (
    iso_code VARCHAR(10),
    continent VARCHAR(50),
    location VARCHAR(100),
    date DATE,
    total_tests BIGINT,
    new_tests BIGINT,
    positive_rate DECIMAL(6,4),
    tests_per_case DECIMAL(10,2),
    tests_units VARCHAR(100),
    total_vaccinations BIGINT,
    people_vaccinated BIGINT,
    people_fully_vaccinated BIGINT,
    total_boosters BIGINT,
    new_vaccinations BIGINT,
    stringency_index DECIMAL(5,2),
    population_density DECIMAL(10,2),
    median_age DECIMAL(5,2),
    aged_65_older DECIMAL(5,2),
    aged_70_older DECIMAL(5,2),
    gdp_per_capita DECIMAL(12,2),
    extreme_poverty DECIMAL(5,2),
    cardiovasc_death_rate DECIMAL(10,2),
    diabetes_prevalence DECIMAL(5,2),
    handwashing_facilities DECIMAL(5,2),
    life_expectancy DECIMAL(5,2),
    human_development_index DECIMAL(4,3),
    excess_mortality_cumulative DECIMAL(10,2),
    excess_mortality DECIMAL(10,2)
);
copy covid_vaccination from 'C:\Windows\CbsTemp\CovidVaccinations.csv' delimiter ',' csv header

SET datestyle = 'ISO, DMY';

select*from covid_vaccination


CREATE TABLE CovidDeaths (
    iso_code VARCHAR(10),
    continent VARCHAR(50),
    location VARCHAR(100),
    date DATE,
    population BIGINT,
    total_cases BIGINT,
    new_cases BIGINT,
    total_deaths BIGINT,
    new_deaths BIGINT,
    total_deaths_per_million DECIMAL(10,2),
    new_deaths_per_million DECIMAL(10,2),
    reproduction_rate DECIMAL(5,2),
    icu_patients BIGINT,
    hosp_patients BIGINT,
    weekly_icu_admissions DECIMAL(10,2),
    weekly_hosp_admissions DECIMAL(10,2)
);

copy covidDeaths from 'C:\Windows\CbsTemp\CovidDeaths.csv' delimiter ',' csv header;

select*from coviddeaths

ALTER TABLE CovidDeaths
DROP COLUMN weekly_icu_admissions,
DROP COLUMN weekly_hosp_admissions;

SELECT
    date,
    total_cases,
    total_deaths,
    ROUND((total_deaths::NUMERIC / NULLIF(total_cases, 0)) * 100, 2) AS death_percentage
FROM CovidDeaths
WHERE location = 'India'
ORDER BY date;

SELECT
    date,
    population,
    total_deaths,
    (total_deaths::numeric / NULLIF(population,0)) * 100 AS death_percentage
FROM CovidDeaths
WHERE location = 'India'
ORDER BY date;

SELECT
    date,
    population,
    total_deaths
FROM CovidDeaths
WHERE location = 'India'
ORDER BY date;


   SELECT COUNT(*)
FROM CovidDeaths
WHERE iso_code IS NULL
   OR continent IS NULL
   OR location IS NULL
   OR date IS NULL
   OR population IS NULL
   OR total_cases IS NULL
   OR new_cases IS NULL
   OR total_deaths IS NULL
   OR new_deaths IS NULL
   OR total_deaths_per_million IS NULL
   OR new_deaths_per_million IS NULL
   OR reproduction_rate IS NULL
   OR icu_patients IS NULL
   OR hosp_patients IS NULL




   SELECT
COUNT(*) FILTER (WHERE iso_code IS NULL) AS iso_code_nulls,
COUNT(*) FILTER (WHERE continent IS NULL) AS continent_nulls,
COUNT(*) FILTER (WHERE location IS NULL) AS location_nulls,
COUNT(*) FILTER (WHERE date IS NULL) AS date_nulls,
COUNT(*) FILTER (WHERE total_tests IS NULL) AS total_tests_nulls,
COUNT(*) FILTER (WHERE new_tests IS NULL) AS new_tests_nulls,
COUNT(*) FILTER (WHERE positive_rate IS NULL) AS positive_rate_nulls,
COUNT(*) FILTER (WHERE tests_per_case IS NULL) AS tests_per_case_nulls,
COUNT(*) FILTER (WHERE tests_units IS NULL) AS tests_units_nulls,
COUNT(*) FILTER (WHERE total_vaccinations IS NULL) AS total_vaccinations_nulls,
COUNT(*) FILTER (WHERE people_vaccinated IS NULL) AS people_vaccinated_nulls,
COUNT(*) FILTER (WHERE people_fully_vaccinated IS NULL) AS people_fully_vaccinated_nulls,
COUNT(*) FILTER (WHERE stringency_index IS NULL) AS stringency_index_nulls,
COUNT(*) FILTER (WHERE population_density IS NULL) AS population_density_nulls,
COUNT(*) FILTER (WHERE median_age IS NULL) AS median_age_nulls,
COUNT(*) FILTER (WHERE aged_65_older IS NULL) AS aged_65_older_nulls,
COUNT(*) FILTER (WHERE aged_70_older IS NULL) AS aged_70_older_nulls,
COUNT(*) FILTER (WHERE gdp_per_capita IS NULL) AS gdp_per_capita_nulls,
COUNT(*) FILTER (WHERE extreme_poverty IS NULL) AS extreme_poverty_nulls,
COUNT(*) FILTER (WHERE cardiovasc_death_rate IS NULL) AS cardiovasc_death_rate_nulls,
COUNT(*) FILTER (WHERE diabetes_prevalence IS NULL) AS diabetes_prevalence_nulls,
COUNT(*) FILTER (WHERE handwashing_facilities IS NULL) AS handwashing_facilities_nulls,
COUNT(*) FILTER (WHERE life_expectancy IS NULL) AS life_expectancy_nulls,
COUNT(*) FILTER (WHERE human_development_index IS NULL) AS human_development_index_nulls
FROM covid_Vaccination;

ALTER TABLE Covid_Vaccination
DROP COLUMN excess_mortality,
DROP COLUMN excess_mortality_cumulative,
DROP COLUMN new_vaccinations,
DROP COLUMN total_boosters;

SELECT
COUNT(*) FILTER (WHERE iso_code IS NULL) AS iso_code_nulls,
COUNT(*) FILTER (WHERE continent IS NULL) AS continent_nulls,
COUNT(*) FILTER (WHERE location IS NULL) AS location_nulls,
COUNT(*) FILTER (WHERE date IS NULL) AS date_nulls,
COUNT(*) FILTER (WHERE population IS NULL) AS population_nulls,
COUNT(*) FILTER (WHERE total_cases IS NULL) AS total_cases_nulls,
COUNT(*) FILTER (WHERE new_cases IS NULL) AS new_cases_nulls,
COUNT(*) FILTER (WHERE total_deaths IS NULL) AS total_deaths_nulls,
COUNT(*) FILTER (WHERE new_deaths IS NULL) AS new_deaths_nulls,
COUNT(*) FILTER (WHERE total_deaths_per_million IS NULL) AS total_deaths_per_million_nulls,
COUNT(*) FILTER (WHERE new_deaths_per_million IS NULL) AS new_deaths_per_million_nulls,
COUNT(*) FILTER (WHERE reproduction_rate IS NULL) AS reproduction_rate_nulls
FROM CovidDeaths;

alter table covidDeaths
drop column hosp_patients,
drop column icu_patients;

select*from covidDeaths
select*from covid_vaccination
--date wise death percentage in India.
SELECT
    date,
    total_cases,
    total_deaths,
    ROUND((total_deaths::NUMERIC / NULLIF(total_cases, 0)) * 100, 2) AS death_percentage
FROM CovidDeaths
WHERE location = 'India'
ORDER BY date offset 70;

--the percentage of total deaths out of the total population in India
SELECT location,
       population,
       MAX(total_deaths) AS total_deaths,
       ROUND((MAX(total_deaths)::NUMERIC / population) * 100, 4) AS death_percentage
FROM coviddeaths
WHERE location = 'India'
GROUP BY location, population;

--from Question 2 by retrieving Total Deaths and Population separately. 
SELECT
    MAX(total_deaths) AS total_deaths,
    MAX(population) AS population
FROM coviddeaths
WHERE location = 'India';

--country with the highest death percentage relative to its population. 

SELECT
    location,
    MAX(total_deaths) AS total_deaths,
    population,
    ROUND((MAX(total_deaths)::NUMERIC / population) * 100, 4) AS death_percentage
FROM coviddeaths
WHERE continent IS NOT NULL
  AND total_deaths IS NOT NULL
GROUP BY location, population
ORDER BY death_percentage DESC
LIMIT 1;

--percentage of COVID-19 positive cases in India

SELECT
    location,
    MAX(population) AS population,
    MAX(total_cases) AS total_cases,
    ROUND((MAX(total_cases)::numeric / MAX(population)) * 100, 4) AS positive_percentage
FROM CovidDeaths
WHERE location = 'India'
GROUP BY location;

--percentage of COVID-19 positive cases in worldwide

SELECT
    SUM(total_cases) AS worldwide_total_cases,
    SUM(population) AS worldwide_population,
    ROUND((SUM(total_cases)::numeric / SUM(population)) * 100, 4) AS positive_percentage
FROM
(
    SELECT
        location,
        MAX(total_cases) AS total_cases,
        MAX(population) AS population
    FROM CovidDeaths
    WHERE continent IS NOT NULL
    GROUP BY location
) AS world_data;

--total number of COVID-19 positive cases by continent
SELECT
    continent,
    SUM(new_cases) AS total_positive_cases
FROM CovidDeaths
WHERE continent IS NOT NULL
GROUP BY continent
ORDER BY total_positive_cases DESC;

--total number of COVID-19 deaths by continent
SELECT
    continent,
    SUM(new_deaths) AS total_deaths
FROM CovidDeaths
WHERE continent IS NOT NULL
GROUP BY continent
ORDER BY total_deaths DESC;

--daily trend of New Cases
SELECT
    date,
    new_cases
   FROM Coviddeaths
WHERE location = 'India'
ORDER BY date;

SELECT
    date,
    SUM(new_cases) AS total_new_cases
FROM coviddeaths
WHERE location = 'India'
  AND new_cases IS NOT NULL
GROUP BY date
ORDER BY date desc;

--percentage of the population aged 65 years and above for each country. 
SELECT
    location AS country,
    aged_65_older AS percentage_aged_65_above
FROM covid_vaccination
GROUP BY location, aged_65_older
ORDER BY percentage_aged_65_above 

SELECT DISTINCT location,
       COALESCE(aged_65_older, 0) AS population_percentage
FROM covid_vaccination;



select*from covidDeaths
select*from covid_vaccination


--total number of vaccinated people in each country.
SELECT location,
       MAX(people_vaccinated) AS total_vaccinated_people
FROM covid_vaccination
GROUP BY location
ORDER BY total_vaccinated_people 
