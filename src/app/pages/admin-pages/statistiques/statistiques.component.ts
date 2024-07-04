import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-statistiques',
  templateUrl: './statistiques.component.html',
  styleUrls: ['./statistiques.component.css']
})
export class StatistiquesComponent implements OnInit{
    // polarArea
    
        constructor() {}

        ngOnInit() {
            this.chartRapportAnanlyse();
            this.chartRapportSynthese();
        }

        chartRapportAnanlyse(){
            const ctx: any = document.getElementById('RapportAnalyse');
            new Chart(ctx, {
                type: 'polarArea',
                data: {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    borderWidth: 1
                }]
                },
                options: {
                scales: {
                    y: {
                    beginAtZero: true
                    }
                }
                }
            });
        }

        chartRapportSynthese(){
            const ctx: any = document.getElementById('RapportSynthese');
            new Chart(ctx, {
                type: 'line',
                data: {
                labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 32, 3, 5, 2, 3, 1, 3, 4, 6, 7, 9],
                    borderWidth: 1
                }]
                },
                options: {
                scales: {
                    y: {
                    beginAtZero: true
                    }
                }
                }
            });
        }



}
